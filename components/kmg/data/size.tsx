export type ProductDetailData = {
  details: string[];
  materialsAndCare: string[];
  sizeAndFit: {
    headers: string[];
    values: string[];
    notice: string;
  };
};

export const productDetailData: ProductDetailData = {
  details: [
    "AA Iconic embroidery on front & both sides",
    "Garment washed",
    "6 Panel cotton twill cap",
    "Curved brim / Unstructured",
    "Featured a standard fit",
    "Adjustable back buckle strap",
    "* 상품의 색상은 모니터 및 기기 사양에 따라 실제 색상과 차이가 있을 수 있습니다.",
    "* 실제 상품의 색상은 상품 디테일 이미지와 가장 흡사하니 해당 이미지 참고 바랍니다.",
  ],
  materialsAndCare: [
    "[SHELL] COTTON 100% - COTTON TWILL",
    "[LINING] COTTON 100% - COTTON OXFORD",

    "모자는 세탁시 형태 변형이 생길 수 있으므로 가능한 세탁은 하지 않는 것을 권장",
    "세탁 시에는 비교적 손상이 적은 찬물 / 손세탁 권장",
    "- 기계 세탁 / 기계 건조 금지",
    "- 표백 금지",
    "- 다림질 불가",
    "- 드라이클리닝 불가",
    "- 마찰에 의한 보푸라기, 올 뜯김 주의",
    "- Do not wash, bleach",
    "- Do not dry clean, tumble",
    "- Do not iron",
    "- Wipe with a dry cloth",
    "- No machine drying allowed",
    "- Take care to avoid pilling & snagging",
  ],

  sizeAndFit: {
    headers: [
      "머리둘레",
      "챙길이",
      "앞패널 중앙",
      "앞패널 사이드",
      "뒤패널 중앙",
      "뒤패널 사이드",
      "조절끈길이",
    ],
    values: [
      "57cm (MIN50~MAX64)",
      "7.5cm",
      "16cm",
      "16cm",
      "12.5cm",
      "17cm",
      "13cm",
    ],
    notice:
      "* 사이즈 측정은 단면(cm) 기준이며, 실측 방법에 따라 1~3cm 사이즈 오차가 있을 수 있습니다. * Cap - SOS (Free)",
  },
};
