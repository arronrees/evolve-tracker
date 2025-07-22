<?php

use App\Http\Controllers\FriendController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
  Route::get('friends', [FriendController::class, 'index'])->name('friends.index');
  Route::post('friends', [FriendController::class, 'store'])->name('friends.store');

  Route::put('friends/{friendRequest}/accept', [FriendController::class, 'accept'])->name('friends.accept');
  Route::put('friends/{friendRequest}/reject', [FriendController::class, 'reject'])->name('friends.reject');
});
