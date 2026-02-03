import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/rich-text-editor';
import type { BreadcrumbItem } from '@/types';
import adminBlogPosts from '@/routes/admin/blog-posts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog Posts',
        href: adminBlogPosts.index().url,
    },
    {
        title: 'New Post',
        href: adminBlogPosts.create().url,
    },
];

export default function AdminBlogCreate() {
    const [body, setBody] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Blog Post" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">Create a new post</h1>
                    <p className="text-sm text-muted-foreground">
                        Share a new story with your audience.
                    </p>
                </div>

                <Form
                    {...adminBlogPosts.store.form()}
                    encType="multipart/form-data"
                    className="grid gap-6 rounded-2xl border bg-card p-6"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" placeholder="A magnetic headline" />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="auto-generated-if-empty"
                                />
                                {errors.slug && (
                                    <p className="text-sm text-destructive">{errors.slug}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    placeholder="Short summary for the index and previews."
                                />
                                {errors.excerpt && (
                                    <p className="text-sm text-destructive">{errors.excerpt}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="body">Body</Label>
                                <input type="hidden" name="body" value={body} readOnly />
                                <RichTextEditor
                                    value={body}
                                    onChange={setBody}
                                    placeholder="Write the full blog content here."
                                />
                                {errors.body && (
                                    <p className="text-sm text-destructive">{errors.body}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cover_image">Cover image</Label>
                                <Input id="cover_image" name="cover_image" type="file" />
                                {errors.cover_image && (
                                    <p className="text-sm text-destructive">
                                        {errors.cover_image}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Publish post'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
