import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "@/libs/graphqls/post";
import { Post, UpdatePostInput } from "@/types/posts";

export function useUpdatePost() {
    const [updatePost, { data, loading, error }] = useMutation<
        { updatePost: Post },
        { id: number; input: UpdatePostInput }
    >(UPDATE_POST);

    const update = (input: { id: number; data: UpdatePostInput }) =>
        updatePost({ variables: { id: input.id, input: input.data } });

    return {
        update,
        data: data?.updatePost ?? null,
        loading,
        error,
    };
}
