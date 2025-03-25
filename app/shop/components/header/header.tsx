import Link from "next/link";
import Navigation from "./navigation";
import MainLogo from "../../../main/components/MainLogo";

const Header = () => {
  return (
    <header className="p-3 fixed top-0 w-full z-[999] bg-white">
      <Navigation />

      <h1>
        <Link href={"/main"}>
          <MainLogo
            link={"https://cdn.imweb.me/thumbnail/20250315/5bb4088474559.png"}
          />
        </Link>
      </h1>
    </header>
  );
};
export default Header;
