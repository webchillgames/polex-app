import { onValue, set, push } from "firebase/database";
import { fbDatabase, fbRef } from "@/firebase";

class FirebaseService {
  createFirebasePayload(payload) {
    const firebasePayload = { type: this.type, ...payload };

    Object.keys(firebasePayload).forEach((key) => {
      if (firebasePayload[key] === undefined) {
        Reflect.deleteProperty(firebasePayload, key);
      }
    });

    return firebasePayload;
  }
}

class FillEmptyService extends FirebaseService {
  type = "fill-empty";

  create(payload) {
    const taskListRef = fbRef(fbDatabase, "/tasks/");
    const newTaskRef = push(taskListRef);

    return set(newTaskRef, this.createFirebasePayload(payload));
  }

  edit(id, payload) {
    return set(
      fbRef(fbDatabase, "tasks/" + id),
      this.createFirebasePayload(payload)
    );
  }

  fetchById(id) {
    const starCountRef = fbRef(fbDatabase, "/tasks/" + id);

    return new Promise((resolve) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        resolve(data);
      });
    });
  }
}

export const fillEmptyService = new FillEmptyService();
