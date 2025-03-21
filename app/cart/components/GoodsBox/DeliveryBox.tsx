import TextHandle from "./subcomponents/TextHandle";

type DeliveryBoxProps = {
  deliveryStyle: string;
  delivery: number;
};

const DeliveryBox = ({ deliveryStyle, delivery }: DeliveryBoxProps) => {
  return (
    <div>
      <TextHandle
        className={deliveryStyle}
        text={delivery > 50000 ? "무료" : "3000"}
      />
    </div>
  );
};

export default DeliveryBox;
