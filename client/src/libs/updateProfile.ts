import { RegisterForm } from "./register";

export const updateProfile = async (token:string ,data: RegisterForm) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    return fetch(`${url}/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();

                if(errorData.error.includes("duplicate key value violates unique constraint")) {
                    if(errorData.error.includes("username")) {
                        throw new Error("Username already exists Change your username");
                    }
                    if(errorData.error.includes("email")) {
                        throw new Error("Email already exists Change your email");
                    }
                }
                throw new Error(errorData.error);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
}