import Product from "@/app/main/components/mainComponent/Product";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Data {
  id: string;
  [key: string]: any; // 다른 필드에 대한 타입을 정의할 수 있습니다.
}

const MainPage = async () => {
  const querySnapshot = await getDocs(collection(firestore, "products"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Data[];

  const dataArr = data.sort((a, b) => b.productId - a.productId);
  // console.log(dataArr);
  return (
    <>
      <section className="mt-60 pb-[5vw] px-3">
        <article className="productWrap">
          {dataArr.map((v) => {
            const price = v.productPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return <Product key={v.id} {...v} productPrice={price} />;
          })}
        </article>
      </section>
    </>
  );
};
export default MainPage;
