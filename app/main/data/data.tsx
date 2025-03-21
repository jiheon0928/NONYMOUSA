import { firestore } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface Data {
  id: string;
  [key: string]: any; // 다른 필드에 대한 타입을 정의할 수 있습니다.
}

export const fetchData = async (): Promise<Data[]> => {
  const querySnapshot = await getDocs(collection(firestore, "products"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Data[];

  return data;
};
