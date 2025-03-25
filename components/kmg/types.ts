// base component
export type BaseButtonProps = {
  clickFunc?: () => void;
  text?: string;
  className: string;
  style?: React.CSSProperties;
};
export type BaseImageProps = {
  img: string;
  className: string;
  func?: () => void;
};
export type BaseTextProps = {
  className?: string;
  text: string;
};

// 반품 교환 표
export type TableListRowProps = {
  label: string;
  items: string[];
};

export type TableRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

// 이미지 슬라이드
export type ImgSlideProps = {
  imgData: string[];
};

// 상품 상세 정보
export type ProductHeaderProps = {
  productName: string;
  productPrice: number;
};

export type ProductBodyProps = {
  infoData: string[];
  noticeData: string[];
};

export type StatusHandlerProps = {
  loading: boolean;
  data: productData[];
  currentProduct?: productData;
};

// zustand / 파이어베이스 데이터 관련
export type ProductStore = {
  data: productData[];
  loading: boolean;
  fetchData: () => Promise<void>;
};

export type productData = {
  productCategory: string;
  productDeliveryPrice: number;
  productHexCodes: string[];
  productNotice: string[];
  productInfo: string[];
  productManufacturer: string;
  productDetails: string;
  productId: number;
  productSize: any[];
  productDeliveryMethod: string;
  productCode: string;
  productPrice: number;
  productOrigin: string;
  productImage: string[];
  productSizeInfo: string;
  productName: string;
  productExpectedShippingDate: ProductExpectedShippingDate;
  productMaterials: string;
};

type ProductExpectedShippingDate = {
  seconds: number;
  nanoseconds: number;
};

// zustand 상품 개수 관련
export type QuantityState = {
  quantity: number;
  setQuantity: (val: number) => void;
  increase: () => void;
  decrease: () => void;
};

// zustand 장바구니 관련

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type CartState = {
  cartItems: CartItem[];
  loading: boolean;
  fetchData: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
};

// 상품 정보(토글)
export type ToggleBtnProps = {
  children: React.ReactNode;
  text: string;
};

export type ProductDetailProps = {
  details: string;
  materials: string;
  sizeInfo: string;
  sizeList: SizeInfo[];
};
type SizeInfo = {
  key: string;
  value: string;
};

// 상품 메타 정보
export type ProductMetaInfoProps = {
  basicInfo: string;
  basicInfoValue: string;
};
export type MetaInfoBoxProps = {
  origin: string;
  manufacturer: string;
  deliveryMethod: string;
  deliveryFee: string;
};

// 상품 수량
export type ProductCntBoxProps = {
  price: number;
};

// 상세페이지 버튼
export type ProductActionButtonsProps = {
  addToCart: () => void;
};

export type CartDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};
