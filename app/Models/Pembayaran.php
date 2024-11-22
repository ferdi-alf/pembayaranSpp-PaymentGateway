<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pembayaran extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'pembayaran';

    protected $fillable = [
        'id_siswa',
        'payment_id',
        'id_spp',
        'bulan',
        'jumlah_bayar'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
