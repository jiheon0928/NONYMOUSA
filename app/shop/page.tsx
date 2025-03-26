import Product from "@/app/shop/components/mainComponent/Product";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Data {
  id: string;
  [key: string]: any;
}

const ShopPage = async () => {
  const querySnapshot = await getDocs(collection(firestore, "products"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Data[];

  const dataArr = data.sort((a, b) => b.productId - a.productId);
  // productPrice를 숫자 그대로 전달합니다.
  return (
    <div>
      <section className="mt-60 pb-[5vw] px-3">
        <article className="productWrap">
          {dataArr.map((v) => (
            <Product key={v.id} {...v} productPrice={v.productPrice} />
          ))}
        </article>
      </section>
    </div>
  );
};

export default ShopPage;
