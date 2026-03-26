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
    eyebrow: "Chất lượng",
    title: "Linh kiện chính hãng, kiểm định rõ ràng",
    description:
      "Mỗi chiếc xe Poseidon sử dụng groupset Shimano chính hãng Nhật Bản, khung Magie/Nhôm đạt chuẩn công nghiệp và được kiểm tra chất lượng trước khi đến tay khách hàng.",
  },
  {
    eyebrow: "Thiết kế",
    title: "Công nghệ đúc nguyên khối, nhẹ và bền",
    description:
      "Khung Magie đúc nguyên khối giúp giảm trọng lượng xuống chỉ từ 12,3 kg, loại bỏ mối hàn yếu và tăng độ cứng vững cho cả hành trình dài lẫn tốc độ cao.",
  },
  {
    eyebrow: "Cam kết",
    title: "Bảo hành 5 năm, hỗ trợ trọn đời",
    description:
      "Poseidon cam kết bảo hành khung xe 5 năm, hỗ trợ kỹ thuật 24/7 và mạng lưới đại lý toàn quốc sẵn sàng phục vụ bảo dưỡng, thay thế linh kiện.",
  },
];

export const aboutTimeline = [
  {
    year: "2018",
    title: "Khởi nguồn thương hiệu",
    description:
      "Poseidon ra đời từ niềm đam mê xe đạp và khát vọng mang đến sản phẩm chất lượng quốc tế với giá phù hợp thị trường Việt Nam.",
  },
  {
    year: "2020",
    title: "Đột phá khung Magie",
    description:
      "Ứng dụng công nghệ đúc Magie nguyên khối, giảm trọng lượng khung xuống chỉ từ 12,3 kg — bước tiến lớn trong phân khúc tầm trung.",
  },
  {
    year: "2023",
    title: "Mạng lưới 120+ đại lý",
    description:
      "Mở rộng hệ thống phân phối toàn quốc với hơn 120 đại lý ủy quyền, từ Hà Nội đến Cần Thơ, đảm bảo dịch vụ hậu mãi sát người dùng.",
  },
  {
    year: "2025",
    title: "Hoàn thiện hệ sinh thái",
    description:
      "Ra mắt đầy đủ 4 dòng xe (Gấp, MTB, Hybrid, Road) cùng nền tảng số mới, phục vụ tư vấn và đặt hàng trực tuyến.",
  },
];

export const dealerRegions = [
  {
    name: "Miền Bắc",
    count: 35,
    cities: ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Bắc Ninh"],
  },
  {
    name: "Miền Trung",
    count: 25,
    cities: ["Đà Nẵng", "Huế", "Nha Trang", "Quy Nhơn"],
  },
  {
    name: "Miền Nam",
    count: 60,
    cities: ["TP.HCM", "Cần Thơ", "Biên Hòa", "Bình Dương"],
  },
];

export const dealerBenefits = [
  {
    icon: Store,
    title: "Hỗ trợ trưng bày & POSM",
    description:
      "Poseidon cung cấp biển hiệu, standee, catalogue và hướng dẫn bài trí showroom chuẩn thương hiệu — giúp đại lý tạo ấn tượng chuyên nghiệp ngay từ ngày đầu.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hành 5 năm, hỗ trợ kỹ thuật",
    description:
      "Chính sách bảo hành khung xe 5 năm, linh kiện 12 tháng. Đội ngũ kỹ thuật hỗ trợ xử lý bảo hành nhanh trong 48 giờ trên toàn quốc.",
  },
  {
    icon: Bike,
    title: "Danh mục đa dạng, biên lợi nhuận tốt",
    description:
      "4 dòng xe phủ mọi phân khúc từ xe gấp đô thị đến road cao cấp. Chính sách giá sỉ cạnh tranh, chiết khấu theo sản lượng và hỗ trợ hàng trưng bày.",
  },
];

export const dealerList = [
  {
    region: "Miền Bắc",
    name: "Poseidon Hà Nội — Cầu Giấy",
    address: "68 Trần Duy Hưng, Cầu Giấy, Hà Nội",
    phone: "0988 221 456",
    specialty: "Đầy đủ dòng xe, khu vực test ride",
    note: "Showroom chính Hà Nội, hỗ trợ tư vấn size & lắp ráp tại chỗ.",
  },
  {
    region: "Miền Trung",
    name: "Poseidon Đà Nẵng — Hải Châu",
    address: "125 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
    phone: "0905 672 118",
    specialty: "MTB, Hybrid & phụ kiện",
    note: "Trung tâm phân phối khu vực miền Trung, giao hàng nhanh các tỉnh lân cận.",
  },
  {
    region: "Miền Nam",
    name: "Poseidon TP.HCM — Bình Thạnh",
    address: "312 Điện Biên Phủ, Bình Thạnh, TP.HCM",
    phone: "0938 080 929",
    specialty: "Xe gấp, Road & dịch vụ bảo dưỡng",
    note: "Showroom lớn nhất hệ thống, giao xe trong ngày nội thành TP.HCM.",
  },
];

export const contactHighlights = [
  { label: "Hotline", value: "1900 63 99 63" },
  { label: "Email", value: "hello@poseidonbike.vn" },
  { label: "Showroom", value: "Q. Bình Thạnh, TP.HCM" },
  { label: "Giờ mở cửa", value: "08:30 - 20:30 mỗi ngày" },
];
