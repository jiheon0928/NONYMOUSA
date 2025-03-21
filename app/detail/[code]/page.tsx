import DetailButton from "@/app/wish/components/detailBtn/Detail.Button";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Data {
  id: string;
  [key: string]: any; // 다른 필드에 대한 타입을 정의할 수 있습니다.
}
type DetailCodePageProps = {
  params: { code: string };
};
const DetailCodePage = async ({ params }: DetailCodePageProps) => {
  const { code } = params;
  const querySnapshot = await getDocs(collection(db, "products"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Data[];
  const dataFilter = data.filter((v) => v.productCode == code);

  console.log(dataFilter[0]);

  return (
    <>
      <div className="mt-[500px]">
        <DetailButton id={dataFilter[0].id} />
      </div>
    </>
  );
};

export default DetailCodePage;
