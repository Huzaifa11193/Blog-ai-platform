<?php

use App\Models\BlogPost;
use Inertia\Testing\AssertableInertia as Assert;

test('home page renders blog previews', function () {
    BlogPost::factory()->count(2)->create();

    $response = $this->get(route('home'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
        ->has('posts', 2)
    );
});

test('blog index renders posts', function () {
    BlogPost::factory()->count(3)->create();

    $response = $this->get(route('blog.index'));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('blog/index')
        ->has('posts.data', 3)
    );
});

test('blog detail renders a post by slug', function () {
    $post = BlogPost::factory()->create([
        'slug' => 'auric-story',
    ]);

    $response = $this->get(route('blog.show', ['blogPost' => $post->slug]));

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('blog/show')
        ->where('post.slug', 'auric-story')
    );
});
