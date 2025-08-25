import { useMutation } from "@apollo/client";
import { CREATE_POST } from "@/libs/graphqls/post";
import {CreateBlogPostInput, Post} from "@/types/posts";

export function useCreatePost() {
    const [createBlogPost, { data, loading, error }] = useMutation<
        { createBlogPost: Post },
        { input: CreateBlogPostInput  }
    >(CREATE_POST);

    const create = (input: CreateBlogPostInput ) =>
        createBlogPost({ variables: { input } });

    return {
        create,
        data: data?.createBlogPost ?? null,
        loading,
        error,
    };
}
