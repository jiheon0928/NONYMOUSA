import { firestore } from "@/firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const removeData = async (itemId: string) => {
  try {
    const itemRef = doc(firestore, "shoppingCart", itemId);
    await deleteDoc(itemRef);
    window.location.reload();
  } catch (error) {}
};
