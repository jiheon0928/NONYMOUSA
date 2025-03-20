type TextProps = {
  text: string;
  TextclassName?: string;
  color: string;
};
const Text = ({ text, TextclassName, color }: TextProps) => {
  return (
    <span style={{ color }} className={"text-[13px] " + TextclassName}>
      {text}
    </span>
  );
};

export default Text;
