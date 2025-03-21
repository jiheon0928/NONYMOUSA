import Link from "next/link";
import MenuText from "./menuText";

type OtionProps = {
  url: string;
  text: string;
};
const Option = ({ url, text }: OtionProps) => {
  return (
    <Link href={url}>
      <li className="py-2 px-4 cursor-pointer text-xs">
        <MenuText text={text} />
      </li>
    </Link>
    //   <Link href={"/main/cap"}>
    //     <li className="py-2 px-4 cursor-pointer text-xs">
    //       <MenuText text={"cap"} />
    //     </li>
    //   </Link>
    //   <Link href={"/main/accessories"}>
    //     <li className="py-2 px-4 cursor-pointer text-xs">
    //       <MenuText text={"accessories"} />
    //     </li>
    //   </Link>
  );
};
export default Option;
