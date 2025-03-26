import MobileShopCartPage from "./components/MobileShopCartPage";
import ShopCartPage from "./components/ShopCartPage";

const Page = () => {
  return (
    <section className="flex justify-center w-screen ">
      <ShopCartPage />
      <MobileShopCartPage />
    </section>
  );
};

export default Page;
