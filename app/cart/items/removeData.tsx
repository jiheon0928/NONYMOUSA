import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const removeData = async (itemId: string) => {
  try {
    const itemRef = doc(db, "shoppingCart", itemId);
    await deleteDoc(itemRef);
    window.location.reload();
  } catch (error) {}
};
