export type BlogPostSummary = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image_url: string | null;
    author: {
        name: string | null;
    };
    created_at: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
    body: string;
};

export type BlogPostComment = {
    id: number;
    body: string;
    author_name: string | null;
    created_at: string | null;
};

export type BlogPostAdminItem = {
    id: number;
    title: string;
    slug: string;
    created_at: string | null;
};

export type BlogPostFormData = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    cover_image_url: string | null;
};
