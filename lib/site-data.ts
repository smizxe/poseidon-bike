import {
  Bike,
  Layers3,
  Orbit,
  ShieldCheck,
  Store,
  Waves,
} from "lucide-react";

export const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/dai-ly", label: "Đại lý" },
];

export const stats = [
  { value: "18", label: "Mẫu xe đang mở bán" },
  { value: "120+", label: "Đại lý toàn quốc" },
  { value: "5 năm", label: "Bảo hành khung xe" },
  { value: "24/7", label: "Hỗ trợ tư vấn kỹ thuật" },
];

export const categories = [
  {
    slug: "fold",
    name: "Xe gấp đô thị",
    shortLabel: "Xe gấp",
    description: "Gấp gọn trong 3 bước, nhẹ và linh hoạt cho căn hộ, văn phòng và commute hàng ngày.",
    image: "/products/ps101.jpg",
  },
  {
    slug: "mtb",
    name: "Xe địa hình MTB",
    shortLabel: "MTB",
    description: "Khung nhôm không mối hàn, phanh dầu Shimano và phuộc dầu cho mọi cung đường.",
    image: "/products/ps300.jpg",
  },
  {
    slug: "hybrid",
    name: "Xe thể thao đường phố",
    shortLabel: "Hybrid",
    description: "Khung Magie đúc nguyên khối, nhẹ và bền cho hành trình dài và luyện tập thể thao.",
    image: "/products/ps600.jpg",
  },
  {
    slug: "road",
    name: "Xe đua road",
    shortLabel: "Road",
    description: "Khung càng Magie, groupset Shimano Claris, tối ưu khí động học cho tốc độ.",
    image: "/products/ps700.jpg",
  },
];

export const products = [
  {
    slug: "poseidon-ps101",
    name: "Poseidon PS101",
    category: "fold",
    categoryLabel: "Xe gấp",
    image: "/products/ps101.jpg",
    gallery: ["/products/ps101.jpg", "/products/ps101-2.jpg", "/products/ps101-3.jpg"],
    tagline: "Xe gấp khung nhôm bền bỉ, Shimano 1x8, phanh đĩa cơ — gọn nhẹ cho đô thị.",
    specs: ["Khung nhôm", "Shimano 1x8", "Phanh đĩa cơ", "Bánh 20 inch"],
    badge: "Gấp gọn",
    weight: "~14 kg",
    wheelSize: "20 inch",
    frame: "Nhôm",
    groupset: "Shimano 1x8",
    brake: "Đĩa cơ",
    highlights: [
      "Tay đề Shimano M315 chính hãng",
      "Gạt líp Shimano TY300 chính hãng",
      "Bàn đạp nhôm bạc đạn siêu trớn",
    ],
  },
  {
    slug: "poseidon-ps103",
    name: "Poseidon PS103",
    category: "fold",
    categoryLabel: "Xe gấp",
    image: "/products/ps103.jpg",
    gallery: ["/products/ps103.jpg", "/products/ps103-2.jpg", "/products/ps103-3.jpg"],
    tagline: "Khung nhôm 6061, vành 2 lớp mạ inox, lốp CST Ironkid — nâng cấp cho dân phố.",
    specs: ["Nhôm 6061", "Shimano 8 tốc", "Phanh đĩa cơ", "Bánh 20 inch"],
    badge: "Nâng cấp",
    weight: "~14 kg",
    wheelSize: "20 inch",
    frame: "Nhôm 6061",
    groupset: "Shimano 8 tốc",
    brake: "Đĩa cơ",
    highlights: [
      "Tay đề Shimano SL M315 Indonesia",
      "Đề sau Shimano Tourney Altus",
      "Vành nhôm 2 lớp dày 4cm mạ inox",
      "Lốp CST Ironkid 20x1.75",
      "Khóa khớp gấp hợp kim nhôm cao cấp",
    ],
  },
  {
    slug: "poseidon-ps300",
    name: "Poseidon PS300",
    category: "mtb",
    categoryLabel: "MTB",
    image: "/products/ps300.jpg",
    gallery: ["/products/ps300.jpg", "/products/ps300-2.jpg", "/products/ps300-3.jpg"],
    tagline: "MTB khung nhôm không mối hàn, phanh dầu Shimano MT200, phuộc dầu — chinh phục mọi địa hình.",
    specs: ["Nhôm không mối hàn", "Shimano 3x8", "Phanh dầu MT200", "27.5 inch"],
    badge: "MTB",
    weight: "14 kg",
    wheelSize: "27.5 inch",
    frame: "Nhôm không mối hàn, dây âm khung",
    groupset: "Shimano Altus M310 3x8",
    brake: "Đĩa dầu Shimano MT200",
    highlights: [
      "Phuộc dầu vai nhôm ống nhôm",
      "Tay đề Shimano M315 3x8",
      "Líp thả Shimano HG200 12-32T",
      "Trục rỗng, đùi nhôm 24-34-42T",
      "Lốp Kenda 27.5 inch",
      "Moay-ơ nhôm ARC 6 bạc đạn cối nổ",
      "Max tải 130 kg",
    ],
  },
  {
    slug: "poseidon-ps600",
    name: "Poseidon PS600",
    category: "hybrid",
    categoryLabel: "Hybrid",
    image: "/products/ps600.jpg",
    gallery: ["/products/ps600.jpg", "/products/ps600-2.jpg", "/products/ps600-3.jpg"],
    tagline: "Khung-càng Magie đúc nguyên khối, phanh dầu Shimano MT200 — nhẹ chỉ 13,6 kg.",
    specs: ["Magie đúc nguyên khối", "Shimano 3x8", "Phanh dầu MT200", "700x32c"],
    badge: "Best Seller",
    weight: "13,6 kg",
    wheelSize: "700x32c (~28 inch)",
    frame: "Magie đúc nguyên khối",
    groupset: "Shimano Altus M310 / TZ500 3x8",
    brake: "Đĩa dầu Shimano MT200",
    highlights: [
      "Khung-càng Magie đúc nguyên khối",
      "Đùi nhôm Shimano TY301 28-38-48T",
      "Líp Shimano HG200-8 12-32T",
      "Vành nhôm 2 lớp 4cm",
      "Lốp Kenda 700x32c",
      "Moay-ơ nhôm ARC 6 bạc đạn cối nổ",
      "Yên da mềm có rãnh giữa",
      "Max tải 125 kg",
    ],
  },
  {
    slug: "poseidon-ps700",
    name: "Poseidon PS700",
    category: "road",
    categoryLabel: "Road",
    image: "/products/ps700.jpg",
    gallery: ["/products/ps700.jpg", "/products/ps700-2.jpg", "/products/ps700-3.jpg"],
    tagline: "Khung-càng Magie, full Shimano Claris R2000, phanh dầu MT200 — chỉ 12,3 kg.",
    specs: ["Magie đúc nguyên khối", "Shimano Claris 2x8", "Phanh dầu MT200", "700x32c"],
    badge: "Premium",
    weight: "12,3 kg",
    wheelSize: "700x32c (~28 inch)",
    frame: "Magie đúc nguyên khối (khung + càng)",
    groupset: "Shimano Claris R2000 2x8",
    brake: "Đĩa dầu Shimano MT200 + UR300",
    highlights: [
      "Khung + Càng Magie đúc nguyên khối",
      "Full groupset Shimano Claris R2000",
      "Phanh đĩa dầu Shimano MT200, củ phanh UR300",
      "Líp thả Shimano HG41 11-32T",
      "Xích KMC Z8 (Đài Loan)",
      "Đùi nhôm Poseidon 34-50T, ổ rỗng cao cấp",
      "Pedal nhôm 4 bạc đạn",
      "Max tải 125 kg",
    ],
  },
  {
    slug: "poseidon-ps750",
    name: "Poseidon PS750",
    category: "road",
    categoryLabel: "Road",
    image: "/products/ps750.jpg",
    gallery: ["/products/ps750.jpg", "/products/ps750-2.jpg", "/products/ps750-3.jpg"],
    tagline: "Khung Magie, càng nhôm không mối hàn, Shimano Claris R2000 — 12,8 kg road giá tốt.",
    specs: ["Magie + Nhôm", "Shimano Claris 2x8", "Phanh đĩa cơ", "700x32c"],
    badge: "Giá tốt",
    weight: "12,8 kg",
    wheelSize: "700x32c (~28 inch)",
    frame: "Magie đúc nguyên khối (khung), Nhôm không mối hàn (càng)",
    groupset: "Shimano Claris R2000 2x8",
    brake: "Đĩa cơ Poseidon",
    highlights: [
      "Khung Magie đúc nguyên khối",
      "Càng nhôm không mối hàn",
      "Full groupset Shimano Claris R2000",
      "Líp thả Shimano HG41",
      "Đùi nhôm 34-50T, ổ rỗng cao cấp",
      "Pedal nhôm 4 bạc đạn",
      "Yên da mềm có rãnh giữa",
      "Max tải 125 kg",
    ],
  },
];


export const homeHighlights = [
  {
    icon: Layers3,
    title: "Danh mục rõ ràng",
    description:
      "Từ road, MTB đến touring và xe gấp, mỗi dòng xe đều được phân nhóm rõ để bạn chọn nhanh hơn.",
  },
  {
    icon: Waves,
    title: "Tinh thần đại dương",
    description:
      "Ngôn ngữ thiết kế lấy cảm hứng từ chuyển động mặt nước, mạnh mẽ nhưng vẫn tinh gọn và hiện đại.",
  },
  {
    icon: Orbit,
    title: "Mạng lưới hỗ trợ rộng",
    description:
      "Đội ngũ tư vấn và hệ thống đại lý giúp bạn dễ xem xe, test ride và bảo hành sau khi mua.",
  },
];

export const processSteps = [
  {
    title: "Chọn dòng xe phù hợp",
    description: "Bắt đầu từ danh mục theo nhu cầu: MTB, road, touring hoặc xe gấp.",
  },
  {
    title: "Lọc theo năm, giá và chiều cao",
    description: "Trang sản phẩm cho phép quét nhanh các model phù hợp thay vì phải tìm thủ công.",
  },
  {
    title: "So sánh màu và cấu hình",
    description: "Mỗi card đã có swatch màu, specs cốt lõi và giá tham khảo để ra quyết định nhanh.",
  },
  {
    title: "Liên hệ đại lý hoặc tư vấn",
    description: "Kết thúc hành trình bằng CTA sang trang đại lý, hotline hoặc form tư vấn.",
  },
];

export const newsItems = [
  {
    tag: "Journal",
    title: "Gợi ý chọn size khung xe cho rider mới",
    description: "Một block tin tức mẫu để sau này đặt bài SEO, bài hướng dẫn hoặc thông báo collection.",
  },
  {
    tag: "Guide",
    title: "Road hay touring: đâu là lựa chọn hợp cho commute mỗi ngày?",
    description: "Kiểu nội dung so sánh rất hợp với website xe đạp vì giúp kéo traffic tìm kiếm tự nhiên.",
  },
  {
    tag: "Brand",
    title: "Cách Poseidon xây nhận diện xoay quanh sắc xanh của mặt nước",
    description: "Dùng cho bài hậu trường thương hiệu hoặc highlight chất liệu màu sắc mới của site.",
  },
];

export const brandPillars = [
  {
    eyebrow: "Performance",
    title: "Hiệu năng có thể cảm nhận được",
    description:
      "Từ geometry, vật liệu khung đến cấu hình truyền động đều được kể bằng ngôn ngữ ngắn gọn, dễ hiểu.",
  },
  {
    eyebrow: "Craft",
    title: "Thẩm mỹ kỹ thuật số tinh gọn",
    description:
      "Thiết kế giao diện ưu tiên typography mạnh, card lớn và ánh sáng mềm để tạo cảm giác showroom online.",
  },
  {
    eyebrow: "Network",
    title: "Bán hàng dựa trên mạng lưới",
    description:
      "Trang đại lý không bị bỏ quên mà trở thành một trong những điểm chốt chuyển đổi quan trọng của hệ thống.",
  },
];

export const aboutTimeline = [
  {
    year: "2018",
    title: "Định hình concept",
    description:
      "Xác lập định hướng thương hiệu xe đạp mang cảm hứng đại dương, hiện đại và gần gũi với rider Việt Nam.",
  },
  {
    year: "2021",
    title: "Mở rộng danh mục",
    description:
      "Từ road và MTB, hệ sản phẩm dần bổ sung touring và xe gấp để phủ nhiều nhu cầu sử dụng hơn.",
  },
  {
    year: "2024",
    title: "Tăng tốc nhận diện",
    description:
      "Đầu tư mạnh hơn cho catalogue, hình ảnh và không gian trưng bày số nhằm hỗ trợ bán hàng đa kênh.",
  },
  {
    year: "2026",
    title: "Làm mới hệ sinh thái web",
    description:
      "Phiên bản Next.js này đặt nền cho website nhanh hơn, đẹp hơn và dễ vận hành nội dung hơn.",
  },
];

export const dealerRegions = [
  {
    name: "Miền Bắc",
    count: 28,
    cities: ["Hà Nội", "Hải Phòng", "Quảng Ninh"],
  },
  {
    name: "Miền Trung",
    count: 18,
    cities: ["Đà Nẵng", "Huế", "Nha Trang"],
  },
  {
    name: "Miền Nam",
    count: 42,
    cities: ["TP.HCM", "Cần Thơ", "Biên Hòa"],
  },
];

export const dealerBenefits = [
  {
    icon: Store,
    title: "Chính sách trưng bày rõ",
    description:
      "Dễ phát triển thành block mô tả hỗ trợ biển bảng, POSM và guideline visual trưng bày tại đại lý.",
  },
  {
    icon: ShieldCheck,
    title: "Hậu mãi và bảo hành",
    description:
      "Khu vực này phù hợp để kể dịch vụ hậu mãi, chính sách bảo hành khung và hỗ trợ kỹ thuật sau bán.",
  },
  {
    icon: Bike,
    title: "Danh mục dễ bán",
    description:
      "Có thể nhấn mạnh các model chiến lược theo vùng, nhóm khách hàng và tỉ lệ doanh số mục tiêu.",
  },
];

export const dealerList = [
  {
    region: "Miền Bắc",
    name: "Poseidon Flagship Hà Nội",
    address: "68 Trần Duy Hưng, Cầu Giấy, Hà Nội",
    phone: "0988 221 456",
    specialty: "Road / MTB cao cấp",
    note: "Có khu test-fit và hẹn tư vấn cuối tuần.",
  },
  {
    region: "Miền Trung",
    name: "Poseidon Central Hub",
    address: "125 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    phone: "0905 672 118",
    specialty: "Touring / Gravel / phụ kiện",
    note: "Phù hợp khách đi tour dài và nhóm đạp cuối tuần.",
  },
  {
    region: "Miền Nam",
    name: "Poseidon Saigon Experience",
    address: "312 Điện Biên Phủ, Bình Thạnh, TP.HCM",
    phone: "0938 080 929",
    specialty: "Urban / Fold / commuter",
    note: "Có giao xe nhanh trong ngày cho khu vực nội thành.",
  },
];

export const contactHighlights = [
  { label: "Hotline", value: "1900 63 99 63" },
  { label: "Email", value: "hello@poseidonbike.vn" },
  { label: "Showroom", value: "Q. Bình Thạnh, TP.HCM" },
  { label: "Giờ mở cửa", value: "08:30 - 20:30 mỗi ngày" },
];
