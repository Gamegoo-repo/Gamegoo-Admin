import { ApiResponse } from "@/types/api/api";
import { authAxios } from "../lib/axios.auth";
import { PostDetail } from "@/types/api/post";

export const getPostDetailApi = (postId: number) =>
  authAxios.get<ApiResponse<PostDetail>>(
    `/api/v2/posts/member/list/${postId}`
  );