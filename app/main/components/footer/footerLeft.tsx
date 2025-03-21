import FooterText from "./subComponents/footerText";

const FooterLeft = () => {
  return (
    <div className="w-[45%]">
      <FooterText text={"Company : Simbacompany Co., Ltd."} />
      <FooterText text={"CEO : Sol hyunjung"} />
      <FooterText text={"Mail : nonymousaa@nonymousaa.com"} />
      <FooterText
        text={"Address : 34 UN Village 1-gil, Yongsan-gu Seoul, KOREA"}
      />
      <FooterText text={"Business Licence : 441-81-01306 "} />
      <FooterText text={"Online Business Licence : 제2019-서울용산-0715"} />
      <FooterText text={"Customer Service : 070-8094-0603"} />
      <div className="ml-20">
        <FooterText
          text={"* 운영 시간 월-금 10:00~17:00 / 점심 시간 13:00~14:00"}
        />
        <FooterText text={"(주말,공휴일 휴무)"} />
      </div>
      <div style={{ borderTop: "1px solid rgba(125,125,125,0.5)" }}>
        <FooterText text={"Copyright ⓒ 2025 NONYMOUSAA All rights reserved."} />
      </div>
    </div>
  );
};
export default FooterLeft;
