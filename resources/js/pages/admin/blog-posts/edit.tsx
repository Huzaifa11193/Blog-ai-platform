import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/rich-text-editor';
import type { BlogPostFormData, BreadcrumbItem } from '@/types';
import adminBlogPosts from '@/routes/admin/blog-posts';

type AdminBlogEditProps = {
    post: BlogPostFormData;
};

export default function AdminBlogEdit({ post }: AdminBlogEditProps) {
    const [body, setBody] = useState(post.body);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Blog Posts',
            href: adminBlogPosts.index().url,
        },
        {
            title: post.title,
            href: adminBlogPosts.edit(post.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit: ${post.title}`} />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Edit post</h1>
                    <p className="text-sm text-muted-foreground">
                        Update your story, cover image, or slug.
                    </p>
                </div>

                <Form
                    {...adminBlogPosts.update.form(post.id)}
                    encType="multipart/form-data"
                    className="grid gap-6 rounded-2xl border bg-card p-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={post.title}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" name="slug" defaultValue={post.slug} />
                                {errors.slug && (
                                    <p className="text-sm text-destructive">{errors.slug}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    defaultValue={post.excerpt}
                                />
                                {errors.excerpt && (
                                    <p className="text-sm text-destructive">{errors.excerpt}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="body">Body</Label>
                                <input type="hidden" name="body" value={body} readOnly />
                                <RichTextEditor value={body} onChange={setBody} />
                                {errors.body && (
                                    <p className="text-sm text-destructive">{errors.body}</p>
                                )}
                            </div>

                            <div className="grid gap-3 rounded-2xl border border-dashed border-border p-4">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold">Cover image</p>
                                        <p className="text-xs text-muted-foreground">
                                            Upload a new image to replace the current cover.
                                        </p>
                                    </div>
                                    {post.cover_image_url && (
                                        <img
                                            src={post.cover_image_url}
                                            alt={post.title}
                                            className="h-16 w-24 rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                                <Input id="cover_image" name="cover_image" type="file" />
                                {errors.cover_image && (
                                    <p className="text-sm text-destructive">
                                        {errors.cover_image}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save changes'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
