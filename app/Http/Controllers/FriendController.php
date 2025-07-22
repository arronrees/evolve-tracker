<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FriendController extends Controller
{
    public function index(Request $request)
    {
        $pendingRequests = $request->user()->receivedFriendRequests()
            ->with('sender:id,name,email')
            ->pending()
            ->latest()
            ->get()
            ->map(function ($friendRequest) {
                return [
                    'id' => $friendRequest->id,
                    'sender' => [
                        'id' => $friendRequest->sender->id,
                        'name' => $friendRequest->sender->name,
                        'email' => $friendRequest->sender->email
                    ],
                    'status' => $friendRequest->status,
                ];
            });

        $friends = $request->user()->friends()
            ->select('users.id', 'users.name', 'users.email')
            ->get();

        return Inertia::render('friends/index', ['pendingRequests' => $pendingRequests, 'friends' => $friends]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
                'max:255',
                'exists:users,email',
                Rule::notIn([$request->user()->email])
            ]
        ]);

        $currentUser = $request->user();
        $targetUser = User::where('email', $validated['email'])->first();

        if ($currentUser->id === $targetUser->id) {
            return back()->withErrors([
                'email' => 'You cannot send a friend request to yourself.'
            ]);
        }

        if ($currentUser->isFriendWith($targetUser)) {
            return back()->withErrors([
                'email' => 'You are already friends with this user.'
            ]);
        }

        $existingRequest = FriendRequest::where(function ($query) use ($currentUser, $targetUser) {
            $query->where([
                ['sender_id', $currentUser->id],
                ['receiver_id', $targetUser->id]
            ])->orWhere([
                ['sender_id', $targetUser->id],
                ['receiver_id', $currentUser->id]
            ]);
        })->where('status', FriendRequest::STATUS_PENDING)->first();

        if ($existingRequest) {
            if ($existingRequest->sender_id === $currentUser->id) {
                return back()->withErrors([
                    'email' => 'You have already sent a friend request to this user.'
                ]);
            } else {
                return back()->withErrors([
                    'email' => 'This user has already sent you a friend request. Check your pending requests.'
                ]);
            }
        }

        $friendRequest = FriendRequest::create([
            'sender_id' => $currentUser->id,
            'receiver_id' => $targetUser->id,
            'status' => FriendRequest::STATUS_PENDING
        ]);

        return redirect()->route('friends.index');
    }

    public function accept(Request $request, $friendRequestId)
    {
        $user = $request->user();

        $friendRequest = FriendRequest::where('id', $friendRequestId)
            ->where('receiver_id', $user->id)
            ->where('status', FriendRequest::STATUS_PENDING)
            ->first();

        if (!$friendRequest) {
            return back()->withErrors([
                'request' => 'Friend request not found or already processed.'
            ]);
        }

        $friendRequest->accept();

        return back()->with('success', "You are now friends!");
    }

    public function reject(Request $request, $friendRequestId)
    {
        $user = $request->user();

        $friendRequest = FriendRequest::where('id', $friendRequestId)
            ->where('receiver_id', $user->id)
            ->where('status', FriendRequest::STATUS_PENDING)
            ->first();

        if (!$friendRequest) {
            return back()->withErrors([
                'request' => 'Friend request not found or already processed.'
            ]);
        }

        $friendRequest->reject();

        return back()->with('success', "Friend request rejected.");
    }
}
