export interface RegisterForm {
    username: string;
    password: string;
    role: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    religion: string;
    food_allergy: string;
    health_issue: string;
    age: number;
}

export const register = async (data: RegisterForm) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL as string;

    if (!data.role) {
        data.role = "user";
    }

    return fetch(`${url}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(async (response) => {
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
};