import ExchangeInfoText from "./ExchangeInfoText";
type ExchangeInfoRow = {
  label: string;
  value: React.ReactNode;
};
const ExchangeInfoRow = ({ label, value }: ExchangeInfoRow) => {
  return (
    <tr>
      <td className="w-1/5 bg-gray-100 border border-gray-300 p-3 font-semibold align-middle">
        {label}
      </td>
      <td className="border border-gray-300 p-3">{value}</td>
    </tr>
  );
};

export default ExchangeInfoRow;
