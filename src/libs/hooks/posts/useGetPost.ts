import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/libs/graphqls/post";
import {PaginationBlogInput, Post} from "@/types/posts";

interface GetPostsResponse {
    posts: {
        items: Post[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

export function useGetAllPost(input: PaginationBlogInput) {
    const { data, loading, error, refetch } = useQuery<GetPostsResponse, { input: PaginationBlogInput }>(
        GET_POSTS,
        {
            variables: { input },
            fetchPolicy: "network-only",
        }
    );

    return {
        posts: data?.posts.items ?? [],
        total: data?.posts.total ?? 0,
        page: data?.posts.page ?? input.page,
        pageSize: data?.posts.pageSize ?? input.pageSize,
        totalPages: data?.posts.totalPages ?? 0,
        loading,
        error,
        refetch,
    };
}
