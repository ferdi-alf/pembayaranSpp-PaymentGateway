<?php

use App\Models\Spp;
use Inertia\Inertia;
use App\Models\Pembayaran;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Middleware\handleIfNotAuth;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;


Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('authen')->group(function () {
    Route::get('/admin-login', [AdminController::class, 'loginAdmin'])->name('admin.login');
    Route::post('/admin-login/store', [AdminController::class, 'storeLogin'])->name('admin.login.store');

});


Route::middleware(handleIfNotAuth::class)->group(function() {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/logout', [AdminController::class, 'logoutAdmin'])->name('admin.logout');
    Route::post('/post/spp', [AdminController::class, 'storeSpp'])->name('store.spp');
    Route::post('/update-spp/{id}', [AdminController::class, 'updateSpp'])->name('update.spp');
    Route::delete('spp/{id}', [AdminController::class, 'destroySpp'])->name('destroy.spp');
   
    Route::post('/data/petugas', [AdminController::class, 'storePetugas'])->name('store.petugas');
    Route::post('/update-petugas/{id}', [AdminController::class, 'updatePetugas'])->name('update.petugas');
    Route::delete('petugas/{id}', [AdminController::class, 'destroyPetugas'])->name('destroy.petugas');

    Route::post('/post/kelas', [AdminController::class, 'storeKelas'])->name('store.kelas');
    Route::post('/update-kelas/{id}', [AdminController::class, 'updateKelas'])->name('update.kelas');
    Route::delete('kelas/{id}', [AdminController::class, 'destroykelas'])->name('destroy.kelas');

    Route::post('/post/siswa', [AdminController::class, 'storeSiswa'])->name('store.siswa');
    Route::post('/update-siswa/{id}', [AdminController::class, 'updateSiswa'])->name('update.siswa');
    
    Route::delete('siswa/{id}', [AdminController::class, 'destroySiswa'])->name('destroy.siswa');


});


Route::get('/dashboard', function () {
    $user = Auth::guard('web')->user();

    $userId = Auth::guard('web')->user()->id; 
    $dataSpp = Spp::all()->map(function ($spp) use ($userId) {
    $pembayaran = Pembayaran::where('id_siswa', $userId)
                                ->where('id_spp', $spp->id)
                                ->first();

        $spp->status = $pembayaran ? 'Lunas' : 'Belum Lunas';
        return $spp;
    });
    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => $user
        ],
        'dataSpp' => $dataSpp,
    ]);
})->name('siswa.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/spp/bayar', [PaymentController::class, 'pay'])->name('pay');
    Route::post('/pembayaran-berhasil', [PaymentController::class, 'success'])->name('pay');
    Route::get('/payment/finish', [PaymentController::class, 'finish'])->name('payment.finish');
});

require __DIR__.'/auth.php';
