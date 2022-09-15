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

  create(payload, path) {
    const taskListRef = fbRef(fbDatabase, path);
    const newTaskRef = push(taskListRef);

    return set(newTaskRef, this.createFirebasePayload(payload));
  }

  fetchByPath(path) {
    const starCountRef = fbRef(fbDatabase, path);

    return new Promise((resolve) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        resolve(data);
      });
    });
  }

  writeToList(path, id, payload) {
    set(fbRef(fbDatabase, path + id), payload);
  }

  edit(id, payload, path) {
    return set(
      fbRef(fbDatabase, path + id),
      this.createFirebasePayload(payload)
    );
  }

  delete(id, path) {
    return set(fbRef(fbDatabase, path + id), null);
  }

  fetchById(id, path) {
    const starCountRef = fbRef(fbDatabase, path + id);

    return new Promise((resolve) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        resolve(data);
      });
    });
  }
}

export const firebaseService = new FirebaseService();
