import { useMutation } from "@apollo/client";
import { DELETE_POST } from "@/libs/graphqls/post";

export function useDeletePost() {
    const [deleteBlogPost, { data, loading, error }] = useMutation<
        { deleteBlogPost: boolean },
        { id: number }
    >(DELETE_POST);

    const remove = (id: number) => deleteBlogPost({ variables: { id } });

    return {
        delete: remove,
        data: data?.deleteBlogPost ?? null,
        loading,
        error,
    };
}
