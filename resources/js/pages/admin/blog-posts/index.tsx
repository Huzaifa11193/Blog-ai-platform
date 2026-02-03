import { Form, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import type { BlogPostAdminItem, BreadcrumbItem } from '@/types';
import adminBlogPosts from '@/routes/admin/blog-posts';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type AdminBlogIndexProps = {
    posts: {
        data: BlogPostAdminItem[];
        links: PaginationLink[];
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog Posts',
        href: adminBlogPosts.index().url,
    },
];

export default function AdminBlogIndex({ posts }: AdminBlogIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Posts" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Blog Posts</h1>
                        <p className="text-sm text-muted-foreground">
                            Create, edit, and publish the stories on your public site.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={adminBlogPosts.create()}>
                            New post
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-2xl border bg-card">
                    <div className="grid grid-cols-1 gap-4 border-b bg-muted/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground md:grid-cols-[1.4fr_0.8fr_0.6fr]">
                        <div>Title</div>
                        <div>Date</div>
                        <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="grid grid-cols-1 items-center gap-4 px-6 py-4 md:grid-cols-[1.4fr_0.8fr_0.6fr]"
                            >
                                <div>
                                    <div className="text-base font-semibold">{post.title}</div>
                                    <div className="text-xs text-muted-foreground">
                                        /{post.slug}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {post.created_at ?? 'Draft'}
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={adminBlogPosts.edit(post.id)}>
                                            Edit
                                        </Link>
                                    </Button>
                                    <Form {...adminBlogPosts.destroy.form(post.id)}>
                                        {({ processing }) => (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                type="submit"
                                                disabled={processing}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {posts.links.map((link, index) => (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url ?? '#'}
                            className={`rounded-full border px-4 py-2 text-sm ${
                                link.active
                                    ? 'border-foreground bg-foreground text-background'
                                    : 'border-border bg-card text-muted-foreground'
                            } ${link.url ? 'hover:border-foreground' : 'pointer-events-none opacity-50'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
