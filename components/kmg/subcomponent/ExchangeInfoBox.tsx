import { returnExchangeInfoData } from "../data/info";
import ExchangeInfoRow from "./ExchangeInfoRow";

const ExchangeInfoBox = () => {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {returnExchangeInfoData.map((item, idx) => (
          <ExchangeInfoRow key={idx} label={item.label} value={item.value} />
        ))}
      </tbody>
    </table>
  );
};

export default ExchangeInfoBox;
