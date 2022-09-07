import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { localStorage } from "@/services/localStorage";

export class authService {
  authWithPass(email, password) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.set("polex-teacher", user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
      });
  }
}
