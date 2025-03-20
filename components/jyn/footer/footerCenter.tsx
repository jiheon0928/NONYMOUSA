import FooterText from "./subComponents/footerText";

const FooterCenter = () => {
  return (
    <div>
      <FooterText text={"Company : Simbacompany Co., Ltd."} />
      <FooterText text={"이용약관"} />
      <strong className="text-[11px]">개인정보처리방침</strong>
    </div>
  );
};
export default FooterCenter;
