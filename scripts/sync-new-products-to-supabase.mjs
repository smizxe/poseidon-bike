import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const appRoot = process.cwd();
const workspaceRoot = path.resolve(appRoot, "..");
const envPath = path.join(appRoot, ".env.local");

function loadEnvFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    process.env[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
}

function requireEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
}

function bikeImage(productSlug, folder, sourceFile, remoteFile = sourceFile.toLowerCase()) {
  return {
    localPath: path.join(workspaceRoot, "bike-image", folder, sourceFile),
    remotePath: `products/${productSlug}/${remoteFile.replace(/\s+/g, "-").replace(/[()]/g, "")}`,
  };
}

loadEnvFile(envPath);

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: { persistSession: false, autoRefreshToken: false },
  },
);

const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "product-media";

const products = [
  {
    slug: "poseidon-ps250",
    name: "Poseidon PS250",
    categorySlug: "touring",
    categoryLabel: "Touring",
    badge: "Commuter",
    cardDescription:
      "Khung nhôm 6061, càng Magie đúc nguyên khối, Shimano 2x8 và phanh dầu MT200 cho nhu cầu touring và hành trình dài.",
    detailDescription:
      "Poseidon PS250 là mẫu xe Touring thực thụ, cân bằng giữa độ bền bỉ, tư thế lái thoải mái cho những hành trình xuyên Việt và khám phá. Khung nhôm 6061 kết hợp càng Magie đúc nguyên khối giúp chiếc xe giữ cảm giác lái chắc chắn, trong khi cấu hình Shimano 2x8 và phanh dầu MT200 đem lại sự ổn định tuyệt vời cho cả đi làm hằng ngày lẫn những chuyến đi xa cuối tuần.",
    weight: "14 kg",
    wheelSize: "700x32c (~28 inch)",
    frameSummary: "Nhôm 6061 + càng Magie · 700x32c",
    sortOrder: 5,
    cardTags: ["Nhôm 6061", "Shimano 2x8", "Phanh dầu MT200", "700x32c"],
    cardHighlights: [
      "Khung nhôm 6061, càng Magie đúc nguyên khối",
      "Tay đề Shimano M315 2x8, gạt líp Altus M310",
      "Đùi nhôm Prowheel 30-46T, líp thả 11-32T",
      "Vành nhôm 2 lớp 4cm, lốp Kenda 700x32c",
    ],
    specifications: [
      ["Khung", "Nhôm 6061"],
      ["Càng", "Magie đúc nguyên khối"],
      ["Phanh", "Phanh dầu Shimano MT200 (Nhật Bản)"],
      ["Tay đề", "Shimano M315 2x8 (Nhật Bản)"],
      ["Gạt đĩa", "Shimano M315 2s (Nhật Bản)"],
      ["Gạt líp", "Shimano Altus M310 8s (Nhật Bản)"],
      ["Đùi đĩa", "Prowheel 30-46T"],
      ["Ổ giữa", "Cốt vuông bạc đạn"],
      ["Líp", "11-32T"],
      ["Vành/Lốp", "Vành nhôm 2 lớp 4cm, lốp Kenda 700x32c (~28 inch)"],
      ["Moay-ơ", "Nhôm 6 bạc đạn cối nổ ARC"],
      ["Cọc yên", "Nhôm đúc"],
      ["Yên", "Yên da mềm có rãnh giữa"],
      ["Bàn đạp", "Nhôm 3 bạc đạn"],
      ["Khối lượng", "14 kg, max tải 125 kg"],
      ["Kích thước", "Size đứng 48cm, ngang 54cm phù hợp chiều cao m6-m8"],
    ],
    colors: [
      {
        name: "Trắng ngọc",
        slug: "trang-ngoc",
        swatchHex: "#f5f5f4",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps250", "ps250", "PS250.jpg", "ps250.jpg"),
          bikeImage("poseidon-ps250", "ps250", "PS250-1.jpg", "ps250-1.jpg"),
          bikeImage("poseidon-ps250", "ps250", "PS250-2.jpg", "ps250-2.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps101",
    name: "Poseidon PS101",
    categorySlug: "fold",
    categoryLabel: "Xe gấp",
    badge: "Gấp gọn",
    cardDescription:
      "Xe gấp khung nhôm bền bỉ, Shimano 1x8, phanh đĩa cơ - gọn nhẹ cho đô thị.",
    detailDescription:
      "Poseidon PS101 tập trung vào sự gọn gàng và bền bỉ cho nhu cầu đi lại hằng ngày. Cấu hình Shimano 1x8 dễ sử dụng, phanh đĩa cơ an toàn và bộ khung gấp nhanh giúp mẫu xe này phù hợp với căn hộ, văn phòng và những quãng đường di chuyển linh hoạt trong phố.",
    weight: "~14 kg",
    wheelSize: "20 inch",
    frameSummary: "Nhôm bền bỉ · 20 inch",
    sortOrder: 10,
    cardTags: ["Khung nhôm", "Shimano 1x8", "Phanh đĩa cơ", "Bánh 20 inch"],
    cardHighlights: [
      "Khung nhôm bền bỉ",
      "Động cơ Shimano 1x8",
      "Tay đề Shimano M315 chính hãng",
      "Gạt líp Shimano TY300 chính hãng",
    ],
    specifications: [
      ["Khung", "Nhôm bền bỉ"],
      ["Bộ truyền động", "Shimano 1x8"],
      ["Phanh", "Đĩa an toàn"],
      ["Tay đề", "Shimano M315 chính hãng"],
      ["Gạt líp", "Shimano TY300 chính hãng"],
      ["Bàn đạp", "Nhôm bạc đạn siêu trơn"],
    ],
    colors: [
      {
        name: "Bạc đô thị",
        slug: "bac-do-thi",
        swatchHex: "#d5d8de",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps101", "PS101", "ps101.jpg"),
          bikeImage("poseidon-ps101", "PS101", "ps101-2.jpg"),
          bikeImage("poseidon-ps101", "PS101", "ps101-3.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps103",
    name: "Poseidon PS103",
    categorySlug: "fold",
    categoryLabel: "Xe gấp",
    badge: "Nâng cấp",
    cardDescription:
      "Khung nhôm 6061, vành 2 lớp mạ inox, lốp CST Ironkid - nâng cấp cho dân phố.",
    detailDescription:
      "Poseidon PS103 là phiên bản xe gấp nâng cấp dành cho người muốn một mẫu xe hoàn thiện tốt, bền và êm hơn trong quá trình sử dụng hằng ngày. Bộ khung nhôm 6061, vành 2 lớp mạ inox cùng cấu hình Shimano 8 tốc độ giúp chiếc xe gọn nhưng vẫn đủ chắc chắn cho nhịp đi lại liên tục.",
    weight: "~14 kg",
    wheelSize: "20 inch",
    frameSummary: "Nhôm 6061 · 20 inch",
    sortOrder: 20,
    cardTags: ["Nhôm 6061", "Shimano 8 tốc", "Phanh đĩa cơ", "20 inch"],
    cardHighlights: [
      "Tay đề Shimano SL M315",
      "Đề sau Shimano Tourney Altus",
      "Vành nhôm 2 lớp dày 4cm mạ inox",
      "Lốp CST Ironkid 20x1.75",
    ],
    specifications: [
      ["Khung", "Hợp kim nhôm chuẩn 6061"],
      ["Phanh", "Phanh đĩa cơ"],
      ["Phuộc", "Phuộc đơ thép cường lực Poseidon"],
      ["Líp", "Shimano 8 tầng 11T-32T"],
      ["Giò đĩa", "1 tầng 52T"],
      ["Tay đề", "Shimano SL M315 Indonesia"],
      ["Đề sau", "Shimano Tourney Altus 8 líp"],
      ["Tốc độ", "8"],
      ["Vành", "Hợp kim nhôm 2 lớp dày 4cm mạ inox"],
      ["Bánh xe", "20 inch"],
      ["Lốp", "CST Ironkid 20x1.75"],
      ["Bàn đạp", "Nhôm bạc đạn Poseidon siêu trớn"],
      ["Moay-ơ", "Nhôm bạc đạn bịt chắn cao su"],
      ["Gấp gọn", "Có"],
      ["Khóa khớp gấp", "Hợp kim nhôm độ bền cao"],
    ],
    colors: [
      {
        name: "Xanh navy",
        slug: "xanh-navy",
        swatchHex: "#1e3a8a",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps103", "PS103", "ps103.jpg"),
          bikeImage("poseidon-ps103", "PS103", "ps103-1.jpg"),
          bikeImage("poseidon-ps103", "PS103", "ps103-2.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps300",
    name: "Poseidon PS300",
    categorySlug: "mtb",
    categoryLabel: "MTB",
    badge: "MTB",
    cardDescription:
      "MTB khung nhôm không mối hàn, phanh dầu Shimano MT200, phuộc dầu - chinh phục mọi địa hình.",
    detailDescription:
      "Poseidon PS300 là mẫu MTB cân bằng giữa sự dễ tiếp cận và khả năng đi địa hình thực dụng. Khung nhôm không mối hàn, phuộc dầu và bộ truyền động Shimano 3x8 giúp chiếc xe kiểm soát tốt hơn trên đường xấu, đường đất và những hành trình luyện tập ngoài phố.",
    weight: "14 kg",
    wheelSize: "27.5 inch",
    frameSummary: "Nhôm không mối hàn · 27.5 inch",
    sortOrder: 30,
    cardTags: ["Nhôm không mối hàn", "Shimano 3x8", "Phanh dầu MT200", "27.5 inch"],
    cardHighlights: [
      "Phuộc dầu vai nhôm ống nhôm",
      "Tay đề Shimano M315 3x8",
      "Líp Shimano HG200 12-32T",
      "Đùi nhôm 24-34-42T",
    ],
    specifications: [
      ["Khung", "Nhôm không mối hàn dây âm khung"],
      ["Phuộc", "Phuộc dầu vai nhôm ống nhôm"],
      ["Phanh", "Phanh đĩa dầu Shimano MT200"],
      ["Tay đề", "Shimano M315 3x8"],
      ["Củ đề", "Shimano Altus M310 8s"],
      ["Củ gạt", "Shimano Tourney TY500 3s"],
      ["Líp", "Shimano HG200 12-32T"],
      ["Đùi đĩa", "Trục rỗng cao cấp, đùi nhôm 24-34-42T"],
      ["Chén cổ", "Neco bạc đạn cao cấp"],
      ["Lốp", "Kenda size 27.5"],
      ["Moay-ơ", "Nhôm ARC 6 bạc cối"],
      ["Cọc yên/Bàn đạp", "Cọc yên nhôm đúc, bàn đạp nhôm 3 bạc đạn"],
      ["Khối lượng", "14 kg, max tải 130 kg"],
      ["Kích thước", "Size đứng 17, ngang 56.5 phù hợp m6-m8"],
    ],
    colors: [
      {
        name: "Đen stealth",
        slug: "den-stealth",
        swatchHex: "#111827",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps300", "PS300", "Image_20251027085503.jpg", "ps300.jpg"),
          bikeImage("poseidon-ps300", "PS300", "Image_20251027085529.jpg", "ps300-2.jpg"),
          bikeImage("poseidon-ps300", "PS300", "Image_20251027085537.jpg", "ps300-3.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps600",
    name: "Poseidon PS600",
    categorySlug: "touring",
    categoryLabel: "Touring",
    badge: "Best Seller",
    cardDescription:
      "Khung-càng Magie đúc nguyên khối, phanh dầu Shimano MT200 — Touring nhẹ nhàng chỉ 13,6 kg.",
    detailDescription:
      "Poseidon PS600 là mẫu Touring hiện đại với khung-càng Magie đúc nguyên khối, tối ưu trọng lượng cho những chuyến đi xa mà không mệt mỏi. Chất xe nhẹ, phản hồi nhanh và tư thế lái dễ chịu kết hợp cùng Shimano 3x8 và phanh dầu MT200 đem lại cảm giác sử dụng ổn định tuyệt vời.",
    weight: "13,6 kg",
    wheelSize: "700x32c (~28 inch)",
    frameSummary: "Magie đúc nguyên khối · 700x32c",
    sortOrder: 40,
    cardTags: ["Magie đúc nguyên khối", "Shimano 3x8", "Phanh dầu MT200", "700x32c"],
    cardHighlights: [
      "Khung-càng Magie đúc nguyên khối",
      "Đùi nhôm Shimano TY301 28-38-48T",
      "Líp Shimano HG200-8 12-32T",
      "Lốp Kenda 700x32c",
    ],
    specifications: [
      ["Khung/Càng", "Magie đúc nguyên khối"],
      ["Phanh", "Phanh dầu Shimano MT200"],
      ["Tay đề", "Shimano M315 3x8"],
      ["Gạt đĩa", "Shimano Tourney TZ500 3s"],
      ["Gạt líp", "Shimano Altus M310 8s"],
      ["Đùi đĩa", "Shimano TY301 28-38-48T"],
      ["Ổ giữa", "Cốt vuông bạc đạn"],
      ["Líp", "Shimano HG200-8 12-32T"],
      ["Vành/Lốp", "Vành nhôm 2 lớp 4cm, lốp Kenda 700x32c"],
      ["Moay-ơ", "Nhôm 6 bạc đạn cối nổ ARC"],
      ["Cọc yên", "Nhôm đúc"],
      ["Yên", "Yên da mềm có rãnh giữa"],
      ["Bàn đạp", "Nhôm đúc bi côn"],
      ["Khối lượng", "13,6 kg, max tải 125 kg"],
      ["Kích thước", "Size đứng 48cm, ngang 53.5cm phù hợp m6-m8"],
    ],
    colors: [
      {
        name: "Đen phố",
        slug: "den-pho",
        swatchHex: "#16181d",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps600", "ps600", "PS600.JPG", "ps600.jpg"),
          bikeImage("poseidon-ps600", "ps600", "PS600-1.JPG", "ps600-1.jpg"),
          bikeImage("poseidon-ps600", "ps600", "PS600-2.JPG", "ps600-2.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps650",
    name: "Poseidon PS650",
    categorySlug: "road",
    categoryLabel: "Road",
    badge: "Road Entry",
    cardDescription:
      "Road entry-performance với khung Magie đúc nguyên khối, Sensah Reflex 2x8 và vóc dáng tốc độ dễ tiếp cận.",
    detailDescription:
      "Poseidon PS650 dành cho rider muốn bước vào thế giới road với một chiếc xe có form dáng hiện đại, phản hồi lái gọn và cấu hình đủ chắc tay. Khung Magie đúc nguyên khối kết hợp Sensah Reflex 2x8 tạo nên trải nghiệm tốc độ rõ nét nhưng vẫn dễ làm quen trong những buổi đạp đầu tiên.",
    weight: "14,2 kg",
    wheelSize: "700x28c (~28 inch)",
    frameSummary: "Magie đúc nguyên khối · 700x28c",
    sortOrder: 45,
    cardTags: ["Khung Magie", "Sensah Reflex 2x8", "700x28c", "14,2 kg"],
    cardHighlights: [
      "Khung Magie đúc nguyên khối cho form road gọn và cứng",
      "Tay lắc, gạt đĩa và củ đề Sensah Reflex 2x8",
      "Líp thả 11-32T, đùi nhôm Poseidon 34-50T",
      "Vành nhôm 2 lớp 4cm, lốp 700x28c",
    ],
    specifications: [
      ["Khung", "Magie đúc nguyên khối"],
      ["Tay lắc", "Sensah Reflex 2x8"],
      ["Gạt đĩa", "Sensah Reflex 2s"],
      ["Củ đề", "Sensah Reflex 8s"],
      ["Líp", "11-32T"],
      ["Đùi đĩa", "Nhôm Poseidon 34-50T"],
      ["Trục giữa", "Cốt vuông bạc đạn"],
      ["Vành/Lốp", "Vành nhôm 2 lớp 4cm, lốp 700x28c (~28 inch)"],
      ["Moay-ơ", "6 bạc đạn cối nổ"],
      ["Ghi-đông/Cọc yên", "Nhôm bản dẹt"],
      ["Khối lượng", "14,2 kg, max tải 125 kg"],
      ["Kích thước", "Size 48|53 phù hợp chiều cao m6-m8"],
    ],
    colors: [
      {
        name: "Titan matte",
        slug: "titan-matte",
        swatchHex: "#7c7f85",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps650", "PS650", "PS650.JPG", "ps650.jpg"),
          bikeImage("poseidon-ps650", "PS650", "PS650-1.JPG", "ps650-1.jpg"),
          bikeImage("poseidon-ps650", "PS650", "PS650-2.JPG", "ps650-2.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps700",
    name: "Poseidon PS700",
    categorySlug: "road",
    categoryLabel: "Road",
    badge: "Premium",
    cardDescription:
      "Khung-càng Magie, full Shimano Claris R2000, phanh dầu MT200 - chỉ 12,3 kg.",
    detailDescription:
      "Poseidon PS700 là mẫu road premium dành cho rider muốn một chiếc xe tốc độ có ngoại hình sắc nét và cấu hình đồng bộ. Khung-càng Magie đúc nguyên khối kết hợp full Shimano Claris R2000 đem lại trải nghiệm đạp mượt, ổn định và gọn gàng cho những buổi tập nghiêm túc lẫn các chặng road cuối tuần.",
    weight: "12,3 kg",
    wheelSize: "700x32c (~28 inch)",
    frameSummary: "Khung + càng Magie · 700x32c",
    sortOrder: 50,
    cardTags: ["Magie đúc nguyên khối", "Claris 2x8", "Phanh dầu MT200", "700x32c"],
    cardHighlights: [
      "Khung + càng Magie đúc nguyên khối",
      "Full groupset Shimano Claris R2000",
      "Phanh đĩa dầu Shimano MT200, củ phanh UR300",
      "Lốp Kenda 700x32c",
    ],
    specifications: [
      ["Khung", "Magie đúc nguyên khối"],
      ["Càng", "Magie đúc nguyên khối"],
      ["Tay đề", "Shimano Claris R2000 2x8"],
      ["Gạt đĩa", "Shimano Claris R2000 2s"],
      ["Gạt líp", "Shimano Claris R2000 8s"],
      ["Phanh", "Shimano MT200, củ phanh UR300"],
      ["Líp", "Shimano HG41 11-32T"],
      ["Xích", "KMC Z8"],
      ["Đùi đĩa", "Nhôm Poseidon 34-50T"],
      ["Ổ giữa", "Ổ rỗng cao cấp B.B vặn"],
      ["Pedal", "Nhôm 4 bạc đạn"],
      ["Vành/Lốp", "Vành nhôm 2 lớp 4cm, lốp Kenda 700x32c"],
      ["Moay-ơ", "Nhôm 6 bạc đạn cối nổ ARC"],
      ["Cọc yên", "Nhôm bản dẹt"],
      ["Yên", "Yên da mềm có rãnh giữa"],
      ["Khối lượng", "12,3 kg, max tải 125 kg"],
    ],
    colors: [
      {
        name: "Carbon blue",
        slug: "carbon-blue",
        swatchHex: "#243b78",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps700", "PS700", "PS700.JPG", "ps700.jpg"),
          bikeImage("poseidon-ps700", "PS700", "PS700-1.JPG", "ps700-1.jpg"),
          bikeImage("poseidon-ps700", "PS700", "PS700-2.JPG", "ps700-2.jpg"),
        ],
      },
    ],
  },
  {
    slug: "poseidon-ps750",
    name: "Poseidon PS750",
    categorySlug: "road",
    categoryLabel: "Road",
    badge: "Giá tốt",
    cardDescription:
      "Khung Magie, càng nhôm không mối hàn, Shimano Claris R2000 - 12,8 kg road giá tốt.",
    detailDescription:
      "Poseidon PS750 hướng tới rider muốn bước vào thế giới road bằng một cấu hình có nền tảng tốt và mức đầu tư hợp lý. Khung Magie đúc nguyên khối, càng nhôm không mối hàn cùng Shimano Claris R2000 giúp chiếc xe giữ được tinh thần tốc độ mà vẫn thân thiện khi sử dụng mỗi ngày.",
    weight: "12,8 kg",
    wheelSize: "700x32c (~28 inch)",
    frameSummary: "Magie + nhôm · 700x32c",
    sortOrder: 60,
    cardTags: ["Magie + Nhôm", "Claris 2x8", "Phanh đĩa cơ", "700x32c"],
    cardHighlights: [
      "Khung Magie đúc nguyên khối",
      "Càng nhôm không mối hàn",
      "Full groupset Shimano Claris R2000",
      "Lốp Kenda 700x32c",
    ],
    specifications: [
      ["Khung", "Magie đúc nguyên khối"],
      ["Càng", "Nhôm không mối hàn"],
      ["Tay đề", "Shimano Claris R2000 2x8"],
      ["Gạt đĩa", "Shimano Claris R2000 2s"],
      ["Gạt líp", "Shimano Claris R2000 8s"],
      ["Đùi đĩa", "Nhôm 34-50T"],
      ["Ổ giữa", "Ổ rỗng cao cấp B.B vặn"],
      ["Líp", "Shimano HG41"],
      ["Pedal", "Nhôm 4 bạc đạn"],
      ["Vành/Lốp", "Vành nhôm 2 lớp 4cm, lốp Kenda 700x32c"],
      ["Moay-ơ", "Nhôm 6 bạc đạn cối nổ ARC"],
      ["Phanh", "Phanh đĩa cơ Poseidon"],
      ["Cọc yên", "Nhôm bản dẹt"],
      ["Yên", "Yên da mềm có rãnh giữa"],
      ["Khối lượng", "12,8 kg, max tải 125 kg"],
      ["Kích thước", "Size đứng 48cm, ngang 54cm phù hợp m62-m82"],
    ],
    colors: [
      {
        name: "Graphite black",
        slug: "graphite-black",
        swatchHex: "#1f2937",
        isDefault: true,
        images: [
          bikeImage("poseidon-ps750", "PS750", "PS750.JPG", "ps750.jpg"),
          bikeImage("poseidon-ps750", "PS750", "PS750-1.JPG", "ps750-1.jpg"),
          bikeImage("poseidon-ps750", "PS750", "PS750-2.JPG", "ps750-2.jpg"),
        ],
      },
    ],
  },
];

async function uploadImage(localPath, remotePath) {
  const buffer = fs.readFileSync(localPath);
  const extension = path.extname(localPath).toLowerCase();
  const contentType = extension === ".png" ? "image/png" : "image/jpeg";
  const { data, error } = await supabase.storage.from(bucket).upload(remotePath, buffer, {
    upsert: true,
    contentType,
  });
  if (error) throw error;
  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}

async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;
  const exists = buckets.some((item) => item.name === bucket || item.id === bucket);
  if (exists) return;
  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: "20MB",
  });
  if (createError) throw createError;
}

async function upsertProduct(product) {
  const uploadedImageCache = new Map();
  const uploadOnce = async (image) => {
    const key = `${image.localPath}::${image.remotePath}`;
    if (!uploadedImageCache.has(key)) {
      uploadedImageCache.set(key, await uploadImage(image.localPath, image.remotePath));
    }
    return uploadedImageCache.get(key);
  };

  for (const color of product.colors) {
    for (const image of color.images) {
      image.publicUrl = await uploadOnce(image);
    }
  }

  const featureImageUrl = product.colors[0]?.images[0]?.publicUrl || "";

  const payload = {
    slug: product.slug,
    name: product.name,
    category_slug: product.categorySlug,
    category_label: product.categoryLabel,
    badge: product.badge,
    card_description: product.cardDescription,
    detail_title: product.name,
    detail_description: product.detailDescription,
    feature_image_url: featureImageUrl,
    card_tags: product.cardTags,
    card_highlights: product.cardHighlights,
    weight: product.weight,
    wheel_size: product.wheelSize,
    frame_summary: product.frameSummary,
    published: true,
    sort_order: product.sortOrder,
  };

  const { data: existing, error: existingError } = await supabase
    .from("products")
    .select("id")
    .eq("slug", product.slug)
    .maybeSingle();
  if (existingError) throw existingError;

  let productId = existing?.id;

  if (productId) {
    const { error } = await supabase.from("products").update(payload).eq("id", productId);
    if (error) throw error;
  } else {
    const { data, error } = await supabase.from("products").insert(payload).select("id").single();
    if (error) throw error;
    productId = data.id;
  }

  await supabase.from("product_specifications").delete().eq("product_id", productId);
  await supabase.from("product_colors").delete().eq("product_id", productId);

  const specificationRows = product.specifications.map(([label, value], index) => ({
    product_id: productId,
    label,
    value,
    sort_order: (index + 1) * 10,
  }));

  const { error: specError } = await supabase.from("product_specifications").insert(specificationRows);
  if (specError) throw specError;

  for (const [colorIndex, color] of product.colors.entries()) {
    const { data: savedColor, error: colorError } = await supabase
      .from("product_colors")
      .insert({
        product_id: productId,
        name: color.name,
        slug: color.slug,
        swatch_hex: color.swatchHex,
        is_default: color.isDefault,
        sort_order: (colorIndex + 1) * 10,
      })
      .select("id")
      .single();
    if (colorError) throw colorError;

    const imageRows = color.images.map((image, imageIndex) => ({
      product_color_id: savedColor.id,
      image_url: image.publicUrl,
      alt_text: `${product.name} ${color.name} - ảnh ${imageIndex + 1}`,
      sort_order: (imageIndex + 1) * 10,
    }));

    const { error: imageError } = await supabase.from("product_color_images").insert(imageRows);
    if (imageError) throw imageError;
  }

  console.log(`Synced ${product.slug}`);
}

await ensureBucket();

for (const product of products) {
  await upsertProduct(product);
}

const { data: summary, error: summaryError } = await supabase
  .from("products")
  .select("slug,name")
  .order("sort_order");

if (summaryError) throw summaryError;

console.log(`Done. Total products on Supabase: ${summary.length}`);
