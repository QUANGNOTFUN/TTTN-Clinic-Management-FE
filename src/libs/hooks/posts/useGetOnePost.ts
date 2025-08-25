import { GET_POST } from "@/libs/graphqls/post";
import { useLazyQuery } from "@apollo/client";
import {useCallback} from "react";

export const useGetOnePost = () => {
    const [executeQuery, { data, loading, error }] = useLazyQuery(GET_POST);

    // Memoize getPostById để hàm không thay đổi trong mỗi render
    const getPostById = useCallback(
        (id) => executeQuery({ variables: { id } }),
        [executeQuery]
    );

    return {
        getPostById,
        data: data?.findOneBlogPost,
        loading,
        error,
    };
}

