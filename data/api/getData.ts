import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Data {
  id: string;
  [key: string]: any; // 다른 필드에 대한 타입을 정의할 수 있습니다.
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { error: string }>
) {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Data[];
    // res.status(200).json(data);
    return data;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
