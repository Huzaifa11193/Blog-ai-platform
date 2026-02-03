<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Vite;

abstract class TestCase extends BaseTestCase
{
    protected bool $createdHotFile = false;

    protected function setUp(): void
    {
        parent::setUp();

        $hotFile = public_path('hot');

        if (! file_exists($hotFile)) {
            file_put_contents($hotFile, 'http://localhost');
            $this->createdHotFile = true;
        }

        Vite::useHotFile($hotFile);
    }

    protected function tearDown(): void
    {
        $hotFile = public_path('hot');

        if ($this->createdHotFile && file_exists($hotFile)) {
            unlink($hotFile);
        }

        parent::tearDown();
    }
}
