import Link from "next/link";
import Navigation from "./subComponents/navigation";
import MainLogo from "../MainLogo";

const Header = () => {
  return (
    <header className="p-3 fixed top-0 w-full z-[999] bg-white">
      <Navigation />
      <h1>
        <Link href="/main">
          <MainLogo link="https://cdn.imweb.me/thumbnail/20250430/070ac4d1ee420.png" />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
