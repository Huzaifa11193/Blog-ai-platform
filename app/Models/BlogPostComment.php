<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPostComment extends Model
{
    /** @use HasFactory<\Database\Factories\BlogPostCommentFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'blog_post_id',
        'user_id',
        'guest_name',
        'guest_email',
        'body',
    ];

    public function blogPost(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
