import BaseText from "../BaseText";

type Props = {
  label: string;
  value: string;
  highlight?: boolean;
};

const TableRow = ({ label, value, highlight }: Props) => (
  <tr className="border-b align-top">
    <th className="bg-gray-100 w-48 text-left px-4 py-2 align-top">
      <BaseText className="font-medium text-gray-700" text={label} />
    </th>
    <td className="px-4 py-2">
      <BaseText
        className={
          highlight
            ? "font-semibold bg-black text-white px-1"
            : "text-gray-800 text-sm"
        }
        text={value}
      />
    </td>
  </tr>
);

export default TableRow;
