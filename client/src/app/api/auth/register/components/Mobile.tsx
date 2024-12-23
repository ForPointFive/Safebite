import { register, RegisterForm } from "@/libs/register";
import { Props } from "../../signin/components/Desktop";
import { Form, Input, Button } from "antd";
import { MdLockOutline, MdMail, MdPerson, MdPhone } from "react-icons/md";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "@/libs/updateProfile";

export default function Mobile({ form, onSubmit }: Props) {

    return (
        <main className="h-screen sm:hidden w-full flex justify-center items-end bg-secondary-main">
            <section className=" h-4/5 gap-10 w-full bg-white rounded-t-3xl flex flex-col relative items-center p-6">
                <div className="flex flex-col w-full h-full align-space-between overflow-auto">
                    <Form
                        form={form}
                        name="mobile_google_register"
                        onFinish={onSubmit}
                        layout="vertical"
                    >
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
                                name="age"
                                label="Age"
                                rules={[{ required: true, message: "Please input your age!" }]}
                            >
                                <Input type="number" size="large" placeholder="Age" />
                            </Form.Item>
                        </div>

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

                        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                            <button
                                type="submit"
                                className="w-full p-2 text-white rounded-lg bg-secondary-main"
                            >
                                Register
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </section>
        </main>
    );
}