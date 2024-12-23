"use client";

import { Form } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Desktop from "./components/Destop";
import Mobile from "./components/Mobile";
import { useState, useEffect } from "react";
import { RegisterForm } from "@/libs/register";
import { updateProfile } from "@/libs/updateProfile";
import { getMe } from "@/libs/getMe";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [form] = Form.useForm();
  const [profile, setProfileData] = useState<RegisterForm | null>(null);

  useEffect(() => {
    async function updateUserProfile() {
      if (!profile || !token) return;

      try {
        const userData = await getMe(token);
        const updateData: RegisterForm = {
          username: userData.username,
          password: userData.password,
          role: userData.role,
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phone: profile.phone,
          religion: profile.religion,
          food_allergy: profile.food_allergy,
          health_issue: profile.health_issue,
          age: profile.age,
        };

        await updateProfile(token, updateData)
        .then((response) => {
          toast.success(`Registration successful`);
          router.push("/");
        })
        .catch((error) => {
          toast.error(`Failed: ${error.message}`);
        });
      } catch (error: any) {
        toast.error(`Failed: ${error.message}`);
      }
    }

    updateUserProfile();
  }, [profile, token, router]);

  const onSubmit = (detail: RegisterForm) => {
    setProfileData(detail);
  };

  return (
    <>
      <Mobile form={form} onSubmit={onSubmit} />
      <Desktop form={form} onSubmit={onSubmit} />
    </>
  );
}