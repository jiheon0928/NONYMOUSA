type footerTextProps = {
  text: string;
};

const FooterText = ({ text }: footerTextProps) => {
  return <p className="mb-2 text-xs">{text}</p>;
};
export default FooterText;
