import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import blog from '@/routes/blog';
import { dashboard, home, login, register } from '@/routes';
import AppearanceToggle from '@/components/appearance-tabs';
import type { BlogPostSummary, SharedData } from '@/types';

type WelcomeProps = {
    canRegister?: boolean;
    posts: BlogPostSummary[];
};

export default function Welcome({ canRegister = true, posts }: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Auric Studio" />
            <div className="min-h-screen bg-[#f8f3ee] text-[#1b1611] dark:bg-[#0f0c0a] dark:text-[#f5efe8]">
                <div className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,145,0,0.22),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,145,0,0.15),_transparent_60%)]" />
                    <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-[#2b3b33]/10 blur-3xl dark:bg-[#2b3b33]/20" />
                    <div className="pointer-events-none absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-[#ff8a00]/20 blur-[90px] dark:bg-[#ff8a00]/10" />
                    <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-10">
                        <Link href={home()} className="text-sm font-semibold uppercase tracking-[0.3em]">
                            Auric Studio
                        </Link>
                        <nav className="flex items-center gap-6 text-sm">
                            <Link href={home()} className="font-semibold">
                                Home
                            </Link>
                            <Link href={blog.index()} className="text-[#5a4b3f] hover:text-[#1b1611] dark:text-[#d6cabb] dark:hover:text-white">
                                Blog
                            </Link>
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full border border-[#1b1611] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] dark:border-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link href={login()} className="text-[#5a4b3f] hover:text-[#1b1611] dark:text-[#d6cabb] dark:hover:text-white">
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-full border border-[#1b1611] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] dark:border-white"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </div>
                            )}
                            <AppearanceToggle className="hidden md:inline-flex" />
                        </nav>
                    </header>

                    <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="flex flex-col gap-8">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1b1611] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                                <Sparkles className="h-4 w-4" />
                                Service Studio
                            </div>
                            <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                                Beautiful service brands deserve a digital home that feels magnetic.
                            </h1>
                            <p className="max-w-xl text-base text-[#5a4b3f] dark:text-[#d6cabb] md:text-lg">
                                Auric Studio designs high‑touch service websites with story‑driven
                                content, conversion‑ready journeys, and a blog engine that keeps
                                trust compounding.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={blog.index()}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#1b1611] px-6 py-3 text-sm font-semibold text-white"
                                >
                                    Explore the blog
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <div className="text-xs uppercase tracking-[0.3em] text-[#8a7665] dark:text-[#b9a792]">
                                    Strategy + Design + Build
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-3xl border border-[#e4d9cf] bg-white/70 p-8 shadow-[0_30px_60px_-40px_rgba(27,22,17,0.7)] backdrop-blur dark:border-white/10 dark:bg-white/5">
                            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.6),rgba(255,255,255,0))] dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
                            <div className="relative space-y-6">
                                <div className="text-xs uppercase tracking-[0.3em] text-[#8a7665] dark:text-[#b9a792]">
                                    Signature Services
                                </div>
                                <div className="grid gap-5">
                                    {[
                                        {
                                            title: 'Service Brand Systems',
                                            detail:
                                                'Positioning, narrative, and visuals that feel premium and effortless.',
                                        },
                                        {
                                            title: 'Conversion Journeys',
                                            detail:
                                                'Client paths mapped to action with elegant, calming interfaces.',
                                        },
                                        {
                                            title: 'Content Architecture',
                                            detail:
                                                'Evergreen blog strategy that nurtures inbound demand.',
                                        },
                                    ].map((service) => (
                                        <div
                                            key={service.title}
                                            className="rounded-2xl border border-[#efe3d8] bg-white px-5 py-4 shadow-[0_12px_24px_-20px_rgba(27,22,17,0.7)] dark:border-white/10 dark:bg-white/10"
                                        >
                                            <h3 className="text-lg font-semibold">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-[#5a4b3f] dark:text-[#d6cabb]">
                                                {service.detail}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="mx-auto w-full max-w-6xl px-6 pb-24">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs uppercase tracking-[0.3em] text-[#8a7665] dark:text-[#b9a792]">
                            Latest Journal
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <h2 className="text-3xl font-semibold md:text-4xl">
                                Fresh writing for service founders.
                            </h2>
                            <Link
                                href={blog.index()}
                                className="hidden items-center gap-2 text-sm font-semibold text-[#1b1611] md:inline-flex"
                            >
                                View all
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e4d9cf] bg-white/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-30px_rgba(27,22,17,0.6)]"
                            >
                                <div className="relative h-44 overflow-hidden bg-[#efe3d8]">
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
                                            <h3 className="text-xl font-semibold leading-snug">
                                                {post.title}
                                            </h3>
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
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 flex md:hidden">
                        <Link
                            href={blog.index()}
                            className="inline-flex items-center gap-2 rounded-full border border-[#1b1611] px-5 py-2 text-sm font-semibold dark:border-white"
                        >
                            View all posts
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
