import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import blog from '@/routes/blog';
import { home } from '@/routes';
import AppearanceToggle from '@/components/appearance-tabs';
import type { BlogPostSummary } from '@/types';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type BlogIndexProps = {
    posts: {
        data: BlogPostSummary[];
        links: PaginationLink[];
    };
};

export default function BlogIndex({ posts }: BlogIndexProps) {
    const description =
        'Service-first growth stories, playbooks, and creative experiments for modern service brands.';

    return (
        <>
            <Head title="Blog">
                <meta head-key="description" name="description" content={description} />
                <meta head-key="og:title" property="og:title" content="Blog" />
                <meta head-key="og:description" property="og:description" content={description} />
                <meta head-key="twitter:title" name="twitter:title" content="Blog" />
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={description}
                />
            </Head>
            <div className="min-h-screen bg-[#f8f3ee] text-[#1b1611] dark:bg-[#0f0c0a] dark:text-[#f5efe8]">
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,145,0,0.2),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,145,0,0.12),_transparent_60%)]" />
                    <div className="pointer-events-none absolute -left-24 top-20 h-60 w-60 rounded-full bg-[#2b3b33]/10 blur-3xl dark:bg-[#2b3b33]/20" />
                    <div className="pointer-events-none absolute right-[-6rem] top-[-4rem] h-64 w-64 rounded-full bg-[#ff8a00]/20 blur-[80px] dark:bg-[#ff8a00]/10" />
                    <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-10">
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
                    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-14">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1b1611] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            Field Notes
                        </div>
                        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                            Service‑first growth stories, playbooks, and creative experiments.
                        </h1>
                        <p className="max-w-2xl text-base text-[#5a4b3f] dark:text-[#d6cabb] md:text-lg">
                            We write about building calm, high‑impact digital experiences for service
                            brands. Expect strategy breakdowns, UX patterns, and operational insights.
                        </p>
                    </section>
                </div>

                <main className="mx-auto w-full max-w-6xl px-6 pb-20">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <article
                                key={post.id}
                                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e4d9cf] bg-white/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-30px_rgba(27,22,17,0.6)] dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="relative h-48 overflow-hidden bg-[#efe3d8]">
                                    {post.cover_image_url ? (
                                        <img
                                            src={post.cover_image_url}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-[#7a6656] dark:text-[#b9a792]">
                                            Auric
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col gap-4 p-6">
                                    <div className="text-xs uppercase tracking-[0.25em] text-[#8a7665] dark:text-[#b9a792]">
                                        {post.created_at ?? 'Drafted'}
                                    </div>
                                    <h2 className="text-xl font-semibold leading-snug">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-[#5a4b3f] dark:text-[#d6cabb]">{post.excerpt}</p>
                                    <div className="mt-auto flex items-center justify-between pt-4 text-sm">
                                        <span className="text-[#8a7665] dark:text-[#b9a792]">
                                            {post.author.name ?? 'Auric Team'}
                                        </span>
                                        <Link
                                                href={blog.show(post.slug)}
                                                className="inline-flex items-center gap-2 font-semibold text-[#1b1611]"
                                            >
                                            Read
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap gap-2">
                        {posts.links.map((link, index) => (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url ?? '#'}
                            className={`rounded-full border px-4 py-2 text-sm ${
                                link.active
                                    ? 'border-[#1b1611] bg-[#1b1611] text-white'
                                    : 'border-[#e4d9cf] bg-white text-[#5a4b3f] dark:border-white/10 dark:bg-white/5 dark:text-[#d6cabb]'
                            } ${link.url ? 'hover:border-[#1b1611] dark:hover:border-white' : 'pointer-events-none opacity-50'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                    </div>
                </main>
            </div>
        </>
    );
}
