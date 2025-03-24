// components/common/StatusHandler.tsx

import { productData } from "@/components/zustand/state";

type StatusHandlerProps = {
  loading: boolean;
  data: productData[];
  currentProduct?: productData;
};

const StatusHandler = ({
  loading,
  data,
  currentProduct,
}: StatusHandlerProps) => {
  if (loading) {
    return <div className="text-center py-10 text-light_Grey">로딩중...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-light_Grey">
        불러올 데이터가 없습니다.
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="text-center py-10 text-light_Grey">
        해당 제품을 찾을 수 없습니다.
      </div>
    );
  }

  return null;
};

export default StatusHandler;
