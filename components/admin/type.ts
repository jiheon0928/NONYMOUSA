export type ProductData = {
  productId: number;
  productName: string;
  productPrice: number;
  productCategory: "cap" | "outer" | "top" | "bottom" | "accessories";
  productImage: string[];
  productExpectedShippingDate: Date | null;
  productInfo: string[];
  productNotice: string;
  productOrigin: string;
  productManufacturer: string;
  productDeliveryMethod: string;
  productDeliveryPrice: number;
};
