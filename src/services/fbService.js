import { onValue } from "firebase/database";
import { fbDatabase, fbRef } from "@/firebase";

class FBService {
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

export const fbService = new FBService();