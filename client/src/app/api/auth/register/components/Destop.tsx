"use client";

import { RegisterForm } from "@/libs/register";
import { Props } from "../../signin/components/Desktop";
import { Form, Input } from "antd";
import { MdPhone } from "react-icons/md";
import toast from "react-hot-toast";

export default function Desktop({ form, onSubmit }: Props) {

    const handleSubmit = (values: RegisterForm) => {
        const details: RegisterForm = {
            username: "",
            password: "",
            role: "",
            name: "",
            surname: "",
            email: "",
            phone: values.phone,
            religion: values.religion,
            food_allergy: values.food_allergy,
            health_issue: values.health_issue,
            age: Number(values.age),
        }
        onSubmit(details);
    };

    return (
        <main className="h-screen max-sm:hidden w-full p-8 bg-secondary-main">
            <section className="max-w-screen-lg w-full h-full mx-auto flex bg-white rounded-lg p-10">
                <div className="flex flex-col w-full h-full align-space-between overflow-auto">
                    <Form
                        form={form}
                        name="desktop_google_register"
                        onFinish={handleSubmit}
                        layout="vertical"
                    >
                        <div className="grid grid-cols-3 gap-4">
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
            </section >
        </main >
    );
}