import { Form, Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import blog from '@/routes/blog';
import { home, login } from '@/routes';
import AppearanceToggle from '@/components/appearance-tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { BlogPostComment, BlogPostDetail, SharedData } from '@/types';

type BlogShowProps = {
    post: BlogPostDetail;
    likes_count: number;
    liked_by_user: boolean;
    comments: BlogPostComment[];
};

export default function BlogShow({
    post,
    likes_count,
    liked_by_user,
    comments,
}: BlogShowProps) {
    const description = post.excerpt;
    const { auth } = usePage<SharedData>().props;
    const canLike = Boolean(auth.user);

    return (
        <>
            <Head title={post.title}>
                <meta head-key="description" name="description" content={description} />
                <meta head-key="og:title" property="og:title" content={post.title} />
                <meta head-key="og:description" property="og:description" content={description} />
                <meta head-key="twitter:title" name="twitter:title" content={post.title} />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={description}
                />
                {post.cover_image_url && (
                    <>
                        <meta
                            head-key="og:image"
                            property="og:image"
                            content={post.cover_image_url}
                        />
                        <meta
                            head-key="twitter:image"
                            name="twitter:image"
                            content={post.cover_image_url}
                        />
                        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                    </>
                )}
            </Head>
            <div className="min-h-screen bg-[#f8f3ee] text-[#1b1611] dark:bg-[#0f0c0a] dark:text-[#f5efe8]">
                <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 pt-10">
                    <Link href={home()} className="text-sm font-semibold uppercase tracking-[0.3em]">
                        Auric Studio
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link href={home()} className="text-[#5a4b3f] hover:text-[#1b1611] dark:text-[#d6cabb] dark:hover:text-white">
                            Home
                        </Link>
                        <Link href={blog.index()} className="font-semibold">
                            Blog
                        </Link>
                        <AppearanceToggle className="hidden md:inline-flex" />
                    </nav>
                </header>

                <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 pb-20 pt-12">
                    <Link
                        href={blog.index()}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#5a4b3f] dark:text-[#d6cabb]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to all posts
                    </Link>

                    <div className="space-y-4">
                        <div className="text-xs uppercase tracking-[0.25em] text-[#8a7665] dark:text-[#b9a792]">
                            {post.created_at ?? 'Drafted'} - {post.author.name ?? 'Auric Team'}
                        </div>
                        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                            {post.title}
                        </h1>
                        <p className="text-lg text-[#5a4b3f] dark:text-[#d6cabb]">{post.excerpt}</p>
                    </div>

                    {post.cover_image_url && (
                        <div className="overflow-hidden rounded-3xl border border-[#e4d9cf] bg-white dark:border-white/10 dark:bg-white/5">
                            <img
                                src={post.cover_image_url}
                                alt={post.title}
                                className="h-72 w-full object-cover md:h-96"
                            />
                        </div>
                    )}

                    <article className="rounded-3xl border border-[#e4d9cf] bg-white p-8 text-base leading-7 text-[#2b231d] shadow-[0_18px_50px_-40px_rgba(27,22,17,0.7)] dark:border-white/10 dark:bg-white/5 dark:text-[#f5efe8]">
                        <div
                            className="tiptap space-y-4"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />
                    </article>

                    <section className="grid gap-6 rounded-3xl border border-[#e4d9cf] bg-white/80 p-6 shadow-[0_18px_50px_-40px_rgba(27,22,17,0.7)] dark:border-white/10 dark:bg-white/5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">Discussion</h2>
                                <p className="text-sm text-[#5a4b3f] dark:text-[#d6cabb]">
                                    {comments.length} comment{comments.length === 1 ? '' : 's'} · {likes_count} like
                                    {likes_count === 1 ? '' : 's'}
                                </p>
                            </div>
                            {canLike ? (
                                <Form {...blog.like.form(post.slug)}>
                                    {({ processing }) => (
                                        <Button
                                            type="submit"
                                            variant={liked_by_user ? 'secondary' : 'default'}
                                            disabled={processing}
                                        >
                                            {liked_by_user ? 'Liked' : 'Like this post'}
                                        </Button>
                                    )}
                                </Form>
                            ) : (
                                <Button variant="outline" asChild>
                                    <Link href={login()}>
                                        Log in to like
                                    </Link>
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-4">
                            <h3 className="text-lg font-semibold">Leave a comment</h3>
                            <Form {...blog.comments.store.form(post.slug)} className="grid gap-4">
                                {({ errors, processing }) => (
                                    <>
                                        {!auth.user && (
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Input name="guest_name" placeholder="Your name" />
                                                    {errors.guest_name && (
                                                        <p className="text-sm text-destructive">
                                                            {errors.guest_name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Input
                                                        name="guest_email"
                                                        type="email"
                                                        placeholder="Your email"
                                                    />
                                                    {errors.guest_email && (
                                                        <p className="text-sm text-destructive">
                                                            {errors.guest_email}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid gap-2">
                                            <Textarea
                                                name="body"
                                                placeholder="Share your thoughts..."
                                            />
                                            {errors.body && (
                                                <p className="text-sm text-destructive">{errors.body}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Posting...' : 'Post comment'}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>

                        <div className="grid gap-4">
                            {comments.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Be the first to leave a comment.
                                </p>
                            ) : (
                                comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="rounded-2xl border border-[#e4d9cf] bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                                    >
                                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#8a7665] dark:text-[#b9a792]">
                                            <span>{comment.author_name ?? 'Guest'}</span>
                                            <span>{comment.created_at ?? ''}</span>
                                        </div>
                                        <p className="mt-3 text-sm text-[#2b231d] dark:text-[#f5efe8]">
                                            {comment.body}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
