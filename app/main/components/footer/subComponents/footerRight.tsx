import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import { RiKakaoTalkFill } from "react-icons/ri";

const FooterRight = () => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Link href={"https://www.instagram.com/nonymous_aa_official/#"}>
        <span style={{ display: "inline-block", fontSize: "20px" }}>
          <IoLogoInstagram />
        </span>
      </Link>
      <Link href={"https://pf.kakao.com/_gCNEn"}>
        <span style={{ display: "inline-block", fontSize: "20px" }}>
          <RiKakaoTalkFill />
        </span>
      </Link>
    </div>
  );
};
export default FooterRight;
