import Image from "next/image";

type MainLogoProps = {
  link: string;
};
const MainLogo = ({ link }: MainLogoProps) => {
  return (
    <>
      <div className="py-12">
        <Image
          className="mx-[auto]"
          width={580}
          height={72}
          src={link}
          alt="로고"
        />
      </div>
    </>
  );
};
export default MainLogo;
