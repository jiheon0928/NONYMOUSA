import BaseText from "../BaseText";

type Props = {
  label: string;
  items: string[];
};

const TableListRow = ({ label, items }: Props) => (
  <tr className="border-b align-top">
    <th className="bg-gray-100 w-48 text-left px-4 py-2 align-top">
      <BaseText className="font-medium text-gray-700" text={label} />
    </th>
    <td className="px-4 py-2">
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>
            <BaseText className="text-gray-800 text-sm" text={item} />
          </li>
        ))}
      </ul>
    </td>
  </tr>
);

export default TableListRow;
