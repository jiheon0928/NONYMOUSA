// src/components/ExchangeTable/ExchangeTable.tsx

import { exchangeReturnData } from "../data/exchange";
import TableRow from "./TableRow";

const ExchangeTable = () => {
  const { basic, 불가사유_섹션 } = exchangeReturnData;
  const tableData = [
    { title: "교환/반품이 가능한 경우", items: 불가사유_섹션.가능한_경우 },
    { title: "교환/반품 안내", items: 불가사유_섹션.안내 },
    { title: "교환/반품 택배비 안내", items: 불가사유_섹션.택배_안내 },
    { title: "교환/반품이 불가능한 경우", items: 불가사유_섹션.불가_사유 },
    { title: "고객 센터", items: 불가사유_섹션.고객센터 },
  ];
  const styledContent = (
    <div className="space-y-4">
      {tableData.map((section, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold mb-1">{section.title}</p>
          <div className="space-y-1">
            {section.items.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <table className="w-full border text-sm">
      <tbody>
        <TableRow label="반품/교환 택배사" value={basic.택배사} />
        <TableRow label="반품 배송비(편도)" value={basic.반품비} />
        <TableRow label="교환 배송비(왕복)" value={basic.교환비} />
        <TableRow label="반품/교환 주소지" value={basic.주소지} />
        <TableRow label="반품/교환 신청 기준일" value={basic.기준일} />
        <tr className="border-t">
          <th className="bg-gray-100 w-48 text-left px-4 py-2 font-medium text-gray-700 align-middle">
            반품/교환 불가능 사유
          </th>
          <td className="px-4 py-2 align-top leading-loose text-[10px]">
            {styledContent}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExchangeTable;
