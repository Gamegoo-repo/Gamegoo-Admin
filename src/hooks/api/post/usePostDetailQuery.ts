import { getPostDetailApi } from "@/api/post/post.api";
import { querykeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

export const usePostDetailQuery = (postId?: number) =>
  useQuery({
    queryKey: [querykeys.Post, postId],
    queryFn: () => getPostDetailApi(postId!).then(res => res.data.data),
    enabled: !!postId,
  });