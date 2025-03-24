type BaseButtonProps = {
  clickFunc?: () => void;
  text?: string;
  className: string;
  style?: React.CSSProperties;
};

const BaseButton = ({ clickFunc, text, className, style }: BaseButtonProps) => {
  return (
    <button style={style} className={className} onClick={clickFunc}>
      {text}
    </button>
  );
};

export default BaseButton;
