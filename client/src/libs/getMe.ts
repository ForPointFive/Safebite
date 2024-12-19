import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getMe = async (token: string) => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8080/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
