<?php

namespace App\Http\Controllers;

use App\Models\PostController;
use App\Http\Requests\StorePostControllerRequest;
use App\Http\Requests\UpdatePostControllerRequest;

class PostControllerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostControllerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PostController $postController)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostController $postController)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostControllerRequest $request, PostController $postController)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostController $postController)
    {
        //
    }
}
