import Axios from "../api";

export const postLogin = async ({
  memberId,
}: {
  memberId: string;
}): Promise<string> => {
  const endpoint = `/api/v2/auth/token/${memberId}`;

  try {
    const response = await Axios.get(endpoint);
    const data = response.data as any;
    const token = data.data;

    return token;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw error;
  }
};
