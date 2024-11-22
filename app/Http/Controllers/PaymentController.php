<?php

namespace App\Http\Controllers;

use Midtrans\Snap;
use App\Models\Spp;
use Inertia\Inertia;
use Midtrans\Config;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function __construct()
        {
            // Konfigurasi Midtrans
            Config::$serverKey = env('MIDTRANS_SERVER_KEY');
            Config::$isProduction = false; // Gunakan true jika production
            Config::$isSanitized = true;
            Config::$is3ds = true;
        }

 public function pay(Request $request)
{
    Config::$serverKey = env('MIDTRANS_SERVER_KEY');
    Config::$isProduction = false; // Ubah menjadi true jika Anda menggunakan mode produksi
    Config::$isSanitized = true;
    Config::$is3ds = true;

    $transaction_details = [
        'order_id' => 'order-' . time(),
        'gross_amount' => $request->amount,
    ];

    $item_details = [
        [
            'id' => $request->id_spp,
            'price' => $request->amount,
            'quantity' => 1,
            'name' => 'Pembayaran SPP',
        ]
    ];

    $customer_details = [
        'first_name' => $request->user_name,
        'phone' => $request->user_phone,
    ];

    $params = [
        'transaction_details' => $transaction_details,
        'item_details' => $item_details,
        'customer_details' => $customer_details
    ];

    try {
        $snapToken = Snap::getSnapToken($params);
        return response()->json(['snapToken' => $snapToken]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }

}


public function success(Request $request) {
    Pembayaran::create([
        'payment_id' => $request['payment_id'],
        'id_spp' => $request['id_spp'],
        'id_siswa' => $request['user_id'],
        'jumlah_bayar' => $request['jumlah_pembayaran'],
        'bulan' => $request['bulan'],
    ]);
}



public function finish(Request $request)
    {
        // Tangani setelah pembayaran selesai
        $result = $request->all();
        // Misalnya, Anda dapat memproses status pembayaran di sini

        return Inertia::render('Finish',  ['result' => $result]);
    }
}
