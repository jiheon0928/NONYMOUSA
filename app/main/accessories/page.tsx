<<<<<<< HEAD
import Product from "@/components/jyn/mainComponent/Product";
=======
import Product from "@/app/main/components/mainComponent/Product";
>>>>>>> JYN
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Data {
  id: string;
  [key: string]: any; // 다른 필드에 대한 타입을 정의할 수 있습니다.
}

const MainPage = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Data[];
  console.log(data);
  const accessoriesData = data.filter((v) => {
    return v.productCategory == "accessories";
  });
  const accessoriesDataArr = accessoriesData.sort(
    (a, b) => b.productId - a.productId
  );
  return (
    <>
      <div className="mt-[250px] pb-[5vw] px-4">
        <div className="productWrap">
          {accessoriesDataArr.map((v) => {
            const price = v.productPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return <Product key={v.id} {...v} productPrice={price} />;
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;
