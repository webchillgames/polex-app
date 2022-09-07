import { onValue } from "firebase/database";
import { fbDatabase, fbRef } from "@/firebase";

export default class fbService {
  fetchList(list) {
    const starCountRef = fbRef(fbDatabase, list);

    return new Promise((resolve) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        resolve(data);
      });
    });
  }
}
