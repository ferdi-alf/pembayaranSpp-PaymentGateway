<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Spp extends Model
{
    use HasFactory, Notifiable;
    
    protected $table = 'spp';

    protected $fillable = ['nominal', 'bulan'];
}
