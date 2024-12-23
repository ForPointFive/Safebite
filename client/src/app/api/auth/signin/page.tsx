"use client";

import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form } from "antd";
import toast from "react-hot-toast";
import Mobile from "./components/Mobile";
import Desktop from "./components/Desktop";

export type FormLogin = {
  username: string;
  password: string;
};

export default function SigninPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onSubmit = async (prop: FormLogin) => {
    const res = await signIn("credentials", {
      username: prop.username,
      password: prop.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      toast.error("Invalid username or password");
    } else {
      const session = await getSession();

      if (session) {
        toast.success("Login successfully");
        router.push("/");
      } else {
        toast.error("Failed to retrieve session.");
      }
    }
  };

  return (
    <>
      <Mobile form={form} onSubmit={onSubmit} />
      <Desktop form={form} onSubmit={onSubmit} />
    </>
  );
}
