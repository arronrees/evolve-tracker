<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }

    public function sentFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'sender_id');
    }

    public function receivedFriendRequests()
    {
        return $this->hasMany(FriendRequest::class, 'receiver_id');
    }

    public function friendships()
    {
        return $this->hasMany(Friendship::class, 'user_id');
    }

    public function friends()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id', 'friend_id')
            ->withTimestamps();
    }

    public function sendFriendRequest(User $user)
    {
        // Check if they're already friends
        if ($this->isFriendWith($user)) {
            return false;
        }

        // Check if request already exists
        $existingRequest = FriendRequest::where([
            ['sender_id', $this->id],
            ['receiver_id', $user->id]
        ])->orWhere([
            ['sender_id', $user->id],
            ['receiver_id', $this->id]
        ])->first();

        if ($existingRequest) {
            return false;
        }

        return FriendRequest::create([
            'sender_id' => $this->id,
            'receiver_id' => $user->id
        ]);
    }

    public function isFriendWith(User $user)
    {
        return $this->friends()->where('friend_id', $user->id)->exists();
    }

    public function getPendingFriendRequests()
    {
        return $this->receivedFriendRequests()
            ->with('sender')
            ->pending()
            ->get();
    }

    public function getSentFriendRequests()
    {
        return $this->sentFriendRequests()
            ->with('receiver')
            ->pending()
            ->get();
    }

    public function removeFriend(User $friend)
    {
        // Remove both friendship records
        Friendship::where([
            ['user_id', $this->id],
            ['friend_id', $friend->id]
        ])->delete();

        Friendship::where([
            ['user_id', $friend->id],
            ['friend_id', $this->id]
        ])->delete();

        return true;
    }
}
