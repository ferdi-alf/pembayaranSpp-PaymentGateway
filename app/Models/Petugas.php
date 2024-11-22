<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Petugas extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'petugas';

     protected $fillable = [
        'username',
        'nama_petugas',
        'role',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

}
