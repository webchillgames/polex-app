import { onValue, set, push } from "firebase/database";
import { fbDatabase, fbRef } from "@/firebase";

import {FirebaseService} from "@/services/firebaseService.js";

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

  delete(id) {
    return set(fbRef(fbDatabase, "tasks/" + id), null);
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
