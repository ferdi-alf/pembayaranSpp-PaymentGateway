<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
       $user = Auth::guard('web')->user();
       
       $update = [];
      
        if ($request->name !== null) {
            $update['name'] = $request->name;
        }

        
        if ($request->nisn !== null) {
            $update['nisn'] = $request->nisn;
        }

        
        if ($request->nis !== null) {
            $update['nis'] = $request->nis;
        }

        
        if ($request->alamat !== null) {
            $update['alamat'] = $request->alamat;
        }

        
        if ($request->no_telp !== null) {
            $update['no_telp'] = $request->no_telp;
        }

        if (!empty($update)) {
            User::where('id', Auth::guard('web')->user()->id)->update($update);
        }

        return back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
