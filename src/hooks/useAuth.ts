import { useState, useEffect } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "~/lib/firebaseConfig";
import { clearCookie, setCookie } from "~/lib/storage";
import { useRouter } from "next/navigation";

interface CurrentUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData: CurrentUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };

        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  //  Đăng nhập
  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      setErrorMessage(null);
      setCookie({ name: "token", value: token });
      setCookie({ name: "refreshToken", value: res.user.refreshToken });

      const userData: CurrentUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };
      setUser(userData);
      router.push("/courses");
    } catch (err) {
      setErrorMessage("Lỗi email hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Đăng xuất
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      clearCookie("token");
      clearCookie("refreshToken");
      setUser(null);
    } catch (err: any) {
      setErrorMessage(err.message || "Đăng xuất thất bại");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    errorMessage,
    login,
    logout,
    setErrorMessage,
  };
}
