<?php

use App\Models\User;
use Database\Seeders\AdminUserSeeder;

test('admin user seeder creates an admin account', function () {
    $this->seed(AdminUserSeeder::class);

    $admin = User::query()->where('email', 'admin@example.com')->first();

    expect($admin)->not->toBeNull();
    expect($admin->is_admin)->toBeTrue();
});
