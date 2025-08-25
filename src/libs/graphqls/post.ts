import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query GetPosts($input: PaginationBlogInput!) {
        posts(input: $input) {
            items {
                id
                title
                content
                author_id
                category
                created_at
                updated_at
                author{
                    user{
                        full_name
                    }
                }
            }
            total
            page
            pageSize
            totalPages
        }
    }
`;

export const SEARCH_POSTS = gql`
    query SearchPosts($input: SearchPostsInput!) {
        searchPosts(input: $input) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
        }
    }
`;

export const GET_POST = gql`
    query GetPost($id: Int!) {
        findOneBlogPost(id: $id) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
            author{
                user{
                    full_name
                }
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($input: CreateBlogPostInput !) {
        createBlogPost(input: $input) {
            title
            content
            author_id
            category
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: Int!, $input: UpdateBlogPostInput!) {
        updateBlogPost(id: $id, input: $input) {
            id
            title
            content
            category
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: Int!) {
        deleteBlogPost(id :$id)
    }
`;
