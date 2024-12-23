'use client';

import { useRouter } from "next/navigation";
import { Form } from "antd";
import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [credentials, setCredentials] = useState<{ username: string, password: string } | null>(null);

  useEffect(() => {
    if (credentials) {
      signIn("credentials", {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
        callbackUrl: "/",
      }).then((res) => {
        if (res?.error) {
          toast.error("Invalid username or password", {duration: 5000});
        } else {
          toast.success("Login successfully", {duration: 5000});
          router.push("/");
        }
      }).catch((error) => {
        toast.error("An unexpected error occurred", {duration: 5000});
        console.error("Sign-in error:", error);
      });
    }
  }, [credentials, router]);

  const onSubmit = (username: string, password: string) => {
    setCredentials({ username, password });
  };

  return (
    <>
      <Mobile form={form} onSubmit={onSubmit} />
      <Desktop form={form} onSubmit={onSubmit} />
    </>
  );
}