import Link from "next/link";
import MainLogo from "../MainLogo";
import FooterLeft from "./footerLeft";
import FooterCenter from "./footerCenter";
import FooterRight from "./footerRight";

const Footer = () => {
  return (
    <footer
      className="mx-20"
      style={{
        borderTop: "1px solid rgba(0, 0, 0, 0.25)",
        padding: "1vw 0",
      }}
    >
      <Link href={"/main"}>
        <MainLogo
          link={"https://cdn.imweb.me/thumbnail/20241021/b71f086e49061.png"}
        />
      </Link>

      <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10vw 1vw",
        }}
      >
        <FooterLeft />
        <FooterCenter />
        <FooterRight />
      </div>
    </footer>
  );
};
export default Footer;
