export interface Post {
    id: number;
    title: string;
    content: string;
    author_id: string;
    category: string;
    created_at: Date;
    updated_at?: Date;
    publisher_id?: Date;
    author: {
        user: {
            full_name: string;
        };
    };
}

export interface PaginationBlogInput{
    page: number;
    pageSize: number;
}

export interface CreateBlogPostInput {
    title: string;
    content: string;
    category: string;
    author_id: string;
    published_at?: string;

}
export interface UpdateBlogPostInput{
    title?: string;
    content?: string;
    category?: string;
}
