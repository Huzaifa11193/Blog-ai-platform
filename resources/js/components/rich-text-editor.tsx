import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from '@/lib/utils';

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start writing...',
    className,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: cn(
                    'tiptap min-h-[200px] space-y-4 rounded-2xl border border-input bg-white/70 px-4 py-3 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px] dark:bg-white/5',
                    className,
                ),
            },
        },
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        if (editor.getHTML() !== value) {
            editor.commands.setContent(value, false);
        }
    }, [editor, value]);

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Enter URL', previousUrl ?? '');

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const buttonClass = (isActive: boolean) =>
        cn(
            'rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition',
            isActive
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground',
        );

    return (
        <div className="grid gap-3">
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={buttonClass(editor.isActive('bold'))}
                >
                    Bold
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={buttonClass(editor.isActive('italic'))}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={buttonClass(editor.isActive('underline'))}
                >
                    Underline
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={buttonClass(editor.isActive('bulletList'))}
                >
                    Bullets
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={buttonClass(editor.isActive('orderedList'))}
                >
                    Numbers
                </button>
                <button
                    type="button"
                    onClick={setLink}
                    className={buttonClass(editor.isActive('link'))}
                >
                    Link
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
