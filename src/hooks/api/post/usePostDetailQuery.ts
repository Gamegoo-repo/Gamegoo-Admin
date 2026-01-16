import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getPostDetailApi } from "@/api/post/post.api";
import { querykeys } from "@/constants/querykeys";

export const usePostDetailQuery = (postId?: number) =>
  useQuery({
    queryKey: [querykeys.Post, postId],
    queryFn: () => getPostDetailApi(postId!).then((res) => res.data.data),
    enabled: !!postId,
    meta: {
      handledErrorCodes: ["NOT_FOUND"],
    },
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
