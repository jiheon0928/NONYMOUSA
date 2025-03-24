import { exchangeReturnData } from "../data/exchange";
import TableRow from "./TableRow";

const BasicInfo = () => {
  const { basic } = exchangeReturnData;
  return (
    <>
      <TableRow label="반품/교환 택배사" value={basic.택배사} />
      <TableRow label="반품 배송비(편도)" value={basic.반품비} />
      <TableRow label="교환 배송비(왕복)" value={basic.교환비} />
      <TableRow label="반품/교환 주소지" value={basic.주소지} highlight />
      <TableRow label="반품/교환 신청 기준일" value={basic.기준일} />
    </>
  );
};

export default BasicInfo;
