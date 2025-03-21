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
export type EditProductData = {
  productId: number;
  productCode: string;
  productHexCodes: string[];
  productName: string;
  productPrice: number;
  productCategory: "cap" | "outer" | "top" | "bottom" | "accessories";
  productImage: string[];
  productExpectedShippingDate: any;
  productInfo: string[];
  productNotice: string[];
  productOrigin: string;
  productManufacturer: string;
  productDeliveryMethod: string;
  productDeliveryPrice: number;
};

export type ProductListProductData = {
  productId: number;
  productCode: string;
  productName: string;
  productPrice: number;
  productCategory: "cap" | "outer" | "top" | "bottom" | "accessories";
  productImage: string[];
  productExpectedShippingDate: any;
  productDeliveryMethod: string;
  productDeliveryPrice: number;
};

export type ProductFormData = {
  productCode: string;
  productHexCodes: string[];
  productName: string;
  productPrice: string;
  productCategory: "cap" | "outer" | "top" | "bottom" | "accessories";
  productNotice: string;
  productOrigin: string;
  productManufacturer: string;
  productDeliveryMethod: string;
  productDeliveryPrice: string;
};
