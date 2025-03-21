import WishComponent from "./components/WishComponent";

const WishPage = async () => {
  return (
    <>
      <section className="my-60 px-60">
        <h2 className="p-3 mb-2 text-xl">Wish List</h2>
        <WishComponent />
      </section>
    </>
  );
};
export default WishPage;
