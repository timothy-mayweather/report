<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;

class ChirpPolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Report $chirp): bool
    {
        return $chirp->user()->is($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Report $chirp): bool
    {
        return $chirp->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Report $chirp): bool
    {
        return $chirp->user()->is($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Report $chirp): bool
    {
        return $chirp->user()->is($user);
    }
}
