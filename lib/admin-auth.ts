import crypto from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";

const SESSION_COOKIE = "poseidon_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

type AdminUserRow = {
  id: string;
  email: string;
  full_name: string;
  password_hash: string;
  is_active: boolean;
};

export type AdminSession = {
  userId: string;
  email: string;
  fullName: string;
  expiresAt: number;
};

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "poseidon-admin-secret";
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function serializeSession(session: AdminSession) {
  const payload = encodeBase64Url(JSON.stringify(session));
  const signature = signValue(payload);
  return `${payload}.${signature}`;
}

function parsePasswordHash(storedHash: string) {
  const [algorithm, salt, hash] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !hash) {
    throw new Error("Invalid password hash format.");
  }

  return { salt, hash };
}

export function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const { salt, hash } = parsePasswordHash(storedHash);
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash, "hex"));
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const rawValue = cookieStore.get(SESSION_COOKIE)?.value;
  if (!rawValue) return null;

  const [payload, signature] = rawValue.split(".");
  if (!payload || !signature) return null;
  if (signValue(payload) !== signature) return null;

  try {
    const session = JSON.parse(decodeBase64Url(payload)) as AdminSession;
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin/dashboard");
  }
}

export async function createAdminSessionCookie(session: Omit<AdminSession, "expiresAt">) {
  const cookieStore = await cookies();
  const fullSession: AdminSession = {
    ...session,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };

  cookieStore.set(SESSION_COOKIE, serializeSession(fullSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(fullSession.expiresAt),
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export async function authenticateAdmin(email: string, password: string) {
  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase admin chưa được cấu hình.");
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Không thể kết nối Supabase admin.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id,email,full_name,password_hash,is_active")
    .eq("email", normalizedEmail)
    .maybeSingle<AdminUserRow>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || !data.is_active) {
    throw new Error("Tài khoản admin không tồn tại hoặc đã bị khóa.");
  }

  if (!verifyPassword(password, data.password_hash)) {
    throw new Error("Email hoặc mật khẩu không đúng.");
  }

  return {
    userId: data.id,
    email: data.email,
    fullName: data.full_name,
  };
}
