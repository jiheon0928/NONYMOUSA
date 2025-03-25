import { productData } from "@/components/kmg/types";
import { useCartStore } from "@/components/zustand/cart";
import { useQuantityStore } from "@/components/zustand/QuantityState";

export const getSameColorProduct = (
  data: productData[],
  currentId: string,
  productCode: string,
  hex: string
): productData | undefined => {
  return data.find(
    (item) =>
      item.productCode === productCode &&
      item.productHexCodes[0] === hex &&
      item.productId !== Number(currentId)
  );
};

export const ColorBtnClick = (
  data: productData[],
  currentId: string,
  productCode: string,
  hex: string,
  router: any,
  currentProductHex: string
) => {
  if (currentProductHex === hex) {
    router.refresh();
    return;
  }

  const sameColorProduct = getSameColorProduct(
    data,
    currentId,
    productCode,
    hex
  );

  if (sameColorProduct) {
    router.push(`/detail/${sameColorProduct.productId}`);
  } else {
    alert("상품 정보가 없습니다.");
  }
};

export const translateSizeKey = (key: string) => {
  const map: Record<string, string> = {
    headCircumference: "머리둘레",
    brimLength: "챙길이",
    centerOfFrontPanel: "앞패널 중앙",
    sideOfFrontPanel: "앞패널 사이드",
    centerOfBehindPanel: "뒤패널 중앙",
    sideOfBehindPanel: "뒤패널 사이드",
    adjustableStrapLength: "조절끈길이",
  };
  return map[key] || key;
};

export const handleAddToCart = async (product: productData) => {
  const { cartItems, addToCart } = useCartStore.getState();
  const { quantity } = useQuantityStore.getState();

  const existingItem = cartItems.find((item) => item.id === product.productId);

  const cartItem = {
    id: product.productId,
    name: product.productName,
    price: product.productPrice,
    quantity: existingItem ? existingItem.quantity + quantity : quantity,
    image: product.productImage?.[0] ?? "",
  };

  await addToCart(cartItem);
};
