<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BlogPostCommentController;
use App\Http\Controllers\BlogPostLikeController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [BlogController::class, 'home'])->name('home');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{blogPost:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{blogPost:slug}/like', [BlogPostLikeController::class, 'like'])
    ->middleware('auth')
    ->name('blog.like');
Route::post('/blog/{blogPost:slug}/comments', [BlogPostCommentController::class, 'store'])
    ->name('blog.comments.store');

Route::get('dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('blog-posts', BlogPostController::class)
            ->except('show');
    });

require __DIR__.'/settings.php';
