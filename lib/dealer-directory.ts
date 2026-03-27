export interface DealerDirectoryItem {
  id: string;
  province: string;
  storeName: string;
  phone: string;
  address: string;
}

export const dealerDirectory: DealerDirectoryItem[] = [
  {
    id: "ha-noi-bkbike",
    province: "Hà Nội",
    storeName: "BKBIKE",
    phone: "0968.281.688",
    address: "Nhà 5C ngõ 96 Võ Thị Sáu, Hai Bà Trưng, Hà Nội (vào ngõ 100m)",
  },
  {
    id: "ha-noi-red-bicycle",
    province: "Hà Nội",
    storeName: "RED Bicycle",
    phone: "0986644955 - 0329514622",
    address:
      "Cuối ngõ 66 đường Liên Kết, Cát Thuế, Vân Côn, xã An Khánh Mới (H. Hoài Đức cũ), Hà Nội",
  },
  {
    id: "ha-noi-ht-bike",
    province: "Hà Nội",
    storeName: "HT BIKE",
    phone: "0817.999.333",
    address: "334 Ngô Gia Tự, phường Đức Giang, quận Long Biên, Hà Nội",
  },
  {
    id: "ha-noi-tong-kho-xe-dap",
    province: "Hà Nội",
    storeName: "Tổng kho xe đạp",
    phone: "0986788448",
    address: "Số 6 ngõ 278 phố Yên Duyên, Hoàng Mai, Hà Nội",
  },
  {
    id: "ha-noi-xe-dap-davita",
    province: "Hà Nội",
    storeName: "Xe đạp Davita",
    phone: "0862332968 - 0357888681",
    address: "15 Khu đô thị Gamuda, Hoàng Mai, Hà Nội",
  },
  {
    id: "binh-duong-xe-dap-binh-duong",
    province: "Bình Dương",
    storeName: "Xe đạp Bình Dương",
    phone: "0987604443",
    address:
      "105/16/20 đường Bùi Quốc Khánh, phường Chánh Nghĩa, thành phố Thủ Dầu Một, Bình Dương",
  },
  {
    id: "binh-duong-xe-dap-nam-tu",
    province: "Bình Dương",
    storeName: "Xe đạp Nam Tú",
    phone: "0942 926 956",
    address: "Số 235 đường Thích Quảng Đức, Chánh Nghĩa, Thủ Dầu Một, Bình Dương",
  },
  {
    id: "khanh-hoa-cho-thue-xe-dap-nha-trang",
    province: "Khánh Hòa",
    storeName: "Cho Thuê Xe Đạp Nha Trang",
    phone: "0948.791.667",
    address: "06 Phạm Văn Đồng, Vĩnh Phước, Nha Trang",
  },
  {
    id: "ho-chi-minh-kho-mon-bicycles",
    province: "Hồ Chí Minh",
    storeName: "Khơ Mon Bicycles",
    phone: "0936167379",
    address: "79 Vũ Tùng, phường 02, quận Bình Thạnh, Hồ Chí Minh",
  },
];

export const dealerProvinces = Array.from(
  new Set(dealerDirectory.map((dealer) => dealer.province)),
).sort((left, right) => left.localeCompare(right, "vi"));
