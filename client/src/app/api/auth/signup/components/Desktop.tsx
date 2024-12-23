'use client';

import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { MdLockOutline, MdMail, MdPerson, MdPhone } from "react-icons/md";
import { register, RegisterForm } from "@/libs/register";
import { GoogleRegisterComponent } from "./Google";
import { Props } from "../../signin/components/Desktop";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function Desktop({ form, onSubmit }: Props) {
  const [registerData, setRegisterData] = useState<RegisterForm | null>(null);
  const [googleLogin, setGoogleLogin] = useState<boolean>(false);

  useEffect(() => {
    if (registerData) {
      register(registerData)
        .then((response) => {
          toast.success("Registration successful");
          onSubmit(registerData.email, registerData.password);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [registerData, googleLogin, onSubmit]);

  const onFinish = (values: any) => {
    const payload: RegisterForm = {
      ...values,
      role: "user",
      age: parseInt(values.age, 10),
    };
    setRegisterData(payload);
  };

  const onSuccess = (response: any) => {
    const credential: any = jwtDecode(response.credential);
    const user: RegisterForm = {
      username: credential.name,
      password: credential.sub,
      name: credential.given_name,
      email: credential.email,
      surname: '',
      phone: '',
      religion: '',
      food_allergy: '',
      health_issue: '',
      age: 0,
      role: 'user',
    };
    setRegisterData(user);
    setGoogleLogin(true);
  };

  const onError = () => {
    console.error("Login Failed");
  };

  return (
    <main className="h-screen max-sm:hidden w-full p-8 bg-secondary-main">
      <section className="max-w-screen-lg w-full h-full mx-auto flex bg-white rounded-lg p-10">
        <div className="flex flex-col w-full h-full align-space-between overflow-auto">
          <p className="text-black text-center font-bold text-xl"> Register </p>
          <Form
            form={form}
            name="desktop_register"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                type="text"
                size="large"
                placeholder="Username"
                prefix={<MdPerson className="mr-2" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Password must be at least 8 characters long" },
                { max: 20, message: "Password must be at most 20 characters long" },
                {
                  pattern: /[a-z]/,
                  message: "Password must include at least one lowercase letter.",
                },
                {
                  pattern: /[A-Z]/,
                  message: "Password must include at least one uppercase letter.",
                },
                {
                  pattern: /\d/,
                  message: "Password must include at least one number.",
                },
                {
                  pattern: /[@$!%*?&]/,
                  message: "Password must include at least one special character.",
                }
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<MdLockOutline className="mr-2" />}
              />
            </Form.Item>

            <div className="flex flex-row w-full gap-1">
              <Form.Item
                name="name"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
                style={{ width: "50%" }}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="First Name"
                  prefix={<MdPerson className="mr-2" />}
                />
              </Form.Item>

              <Form.Item
                name="surname"
                label="Last Name"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
                style={{ width: "50%" }}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="Last Name"
                  prefix={<MdPerson className="mr-2" />}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  type="email"
                  size="large"
                  placeholder="example@email.com"
                  prefix={<MdMail className="mr-2" />}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10 digits phone number",
                  }
                ]}
              >
                <Input
                  type="tel"
                  size="large"
                  placeholder="Phone"
                  prefix={<MdPhone className="mr-2" />}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="religion"
                label="Religion"
                rules={[
                  { required: true, message: "Please input your religion!" },
                ]}
              >
                <Input type="text" size="large" placeholder="Religion" />
              </Form.Item>

              <Form.Item
                name="food_allergy"
                label="Food Allergy"
                rules={[
                  {
                    required: true,
                    message: "Please input your food allergy!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="Food Allergy" />
              </Form.Item>

              <Form.Item
                name="health_issue"
                label="Health Issue"
                rules={[
                  {
                    required: true,
                    message: "Please input your health issue!",
                  },
                ]}
              >
                <Input type="text" size="large" placeholder="Health Issue" />
              </Form.Item>

              <Form.Item
                name="age"
                label="Age"
                rules={[{ required: true, message: "Please input your age!" }]}
              >
                <Input type="number" size="large" placeholder="Age" />
              </Form.Item>
            </div>

            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                className="w-full p-2 text-white rounded-lg bg-secondary-main"
              >
                Register
              </button>
            </Form.Item>
          </Form>
          <hr />
          <div className="flex flex-col gap-2 mt-1">
            <p className="text-black text-center font-bold">
              Or Sign Up with
            </p>
            <GoogleRegisterComponent onSuccess={onSuccess} onError={onError} />
          </div>
        </div>
      </section>
    </main>
  );
};