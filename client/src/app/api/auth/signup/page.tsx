'use client';

import { useRouter } from "next/navigation";
import { Form } from "antd";
import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [credentials, setCredentials] = useState<{ username: string, password: string } | null>(null);
  const [googleLogin, setGoogleLogin] = useState<boolean>(false);

  useEffect(() => {
    if (credentials) {
      signIn("credentials", {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
        callbackUrl: "/",
      }).then(async (res) => {
        if (res?.error) {
          toast.error("Invalid username or password", { duration: 5000 });
        } else {
          toast.success("Login successfully", { duration: 5000 });
          const session = await getSession();
          if(session) {
            if (googleLogin) {
              router.push(`./register?token=${session.user.token}`);
            } else {
              router.push("./register");
            }

            toast.success("Login successfully");
          }
        }
      }).catch((error) => {
        toast.error("An unexpected error occurred", { duration: 5000 });
        console.error("Sign-in error:", error);
      });
    }
  }, [credentials, googleLogin, router]);

  const onSubmit = (username: string, password: string, isGoogleLogin: boolean) => {
    setCredentials({ username, password });
    setGoogleLogin(isGoogleLogin);
  };

  return (
    <>
      <Mobile form={form} onSubmit={onSubmit} />
      <Desktop form={form} onSubmit={onSubmit} />
    </>
  );
}