import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useTeacherStore } from "@/stores/teacher";

class AuthService {
  async auth(email, password) {
    const store = useTeacherStore();
    const auth = getAuth();
    const res = await signInWithEmailAndPassword(auth, email, password);
    store.setTeacher(res.user.accessToken);
  }
}

export const authService = new AuthService();
