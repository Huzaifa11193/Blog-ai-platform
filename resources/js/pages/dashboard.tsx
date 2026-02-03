import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, PencilLine, Plus, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import adminBlogPosts from '@/routes/admin/blog-posts';
import blog from '@/routes/blog';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type DashboardProps = {
    stats: {
        total_posts: number;
        posts_last_week: number;
        total_users: number;
        admin_users: number;
        total_comments: number;
        total_likes: number;
    };
    latest_posts: {
        id: number;
        title: string;
        slug: string;
        created_at: string | null;
    }[];
};

export default function Dashboard({ stats, latest_posts }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = Boolean(auth.user?.is_admin);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            <Sparkles className="h-3 w-3" />
                            Admin Studio
                        </div>
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Keep the blog fresh and the service story consistent.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={blog.index()}>
                                View public blog
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        {isAdmin && (
                            <Button asChild>
                                <Link href={adminBlogPosts.create()}>
                                    <Plus className="h-4 w-4" />
                                    New post
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                Total posts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="text-3xl font-semibold">{stats.total_posts}</div>
                            <Badge variant="secondary">+{stats.posts_last_week} this week</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                Posts last 7 days
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.posts_last_week}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                Total users
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.total_users}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                Admin users
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.admin_users}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                Total comments
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.total_comments}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground">
                                Total likes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-semibold">
                            {stats.total_likes}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Recent blog posts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {latest_posts.length === 0 ? (
                                <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                                    No posts yet. Create your first post to start telling the story.
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {latest_posts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="flex flex-wrap items-center justify-between gap-3 py-3"
                                        >
                                            <div>
                                                <p className="font-semibold">{post.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    /blog/{post.slug} · {post.created_at ?? 'Draft'}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={blog.show(post.slug)}>
                                                        View
                                                    </Link>
                                                </Button>
                                                {isAdmin && (
                                                    <Button size="sm" asChild>
                                                        <Link href={adminBlogPosts.edit(post.id)}>
                                                            <PencilLine className="h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Blog management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Keep your admin panel organized with direct actions.
                            </p>
                            <div className="grid gap-2">
                                {isAdmin ? (
                                    <Button variant="outline" asChild>
                                        <Link href={adminBlogPosts.index()}>
                                            View blog listing
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" asChild>
                                        <Link href={blog.index()}>
                                            View blog listing
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )}
                                {isAdmin && (
                                    <>
                                        <Button variant="outline" asChild>
                                            <Link href={adminBlogPosts.index()}>
                                                Manage posts
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href={adminBlogPosts.create()}>
                                                <Plus className="h-4 w-4" />
                                                Add new post
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
