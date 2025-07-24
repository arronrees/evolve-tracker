<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('name', 'asc')->get();

        return Inertia::render('admin/users/index', ['users' => $users]);
    }
}
