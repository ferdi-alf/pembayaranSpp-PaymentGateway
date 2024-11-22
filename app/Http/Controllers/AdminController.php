<?php

namespace App\Http\Controllers;

use App\Models\Spp;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Kelas;
use App\Models\Petugas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function loginAdmin() {
        return Inertia::render('Admin/Login');
    }

    public function storeLogin(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

    $remember = $request->input('remember', false);

    $credentials = $request->only('username', 'password');

    if (Auth::guard('admin')->attempt($credentials, $remember)) {
        return redirect()->route('admin.dashboard'); // Berhasil login
    }


    // Jika gagal login
    return back()->withErrors([
        'username' => 'username atau password salah.',
    ])->withInput();
    }

    Public function dashboard() {
        $dataSpp = Spp::get();
        $dataUser = Auth::guard('admin')->user();
        $dataPetugas = Petugas::where('username', '!=', $dataUser->username)->get();
        $dataKelas = Kelas::get();
        $dataSiswa = User::get();
        $pembayaran = DB::table('pembayaran')
        ->join('users', 'pembayaran.id_siswa', '=', 'users.id')
        ->join('kelas', 'users.id_kelas', '=', 'kelas.id')
        ->select(
            'pembayaran.id_spp',
            'pembayaran.created_at',
            'pembayaran.jumlah_bayar',
            'pembayaran.bulan',
            'users.name as user_name',
            'users.nisn',
            'users.id_kelas as kelas_id',
            'kelas.nama_kelas',
            'kelas.jurusan'
        )
        ->get();

        return Inertia::render('Admin/Dashboard', [
            'auth' => [
                'admin' => $dataUser
            ],
            'dataPetugas' => $dataPetugas,
            'dataSpp' => $dataSpp,
            'dataKelas' => $dataKelas,
            'dataSiswa' => $dataSiswa,
            'dataPembayaran' => $pembayaran
        ]);
    }

    public function storeSpp(Request $request) {
        $request->validate([
            'harga' => 'required',
            'bulan' => 'required'
        ]);

        $spp = new Spp();
        $spp->nominal = $request['harga'];
        $spp->bulan = $request['bulan'];
        $spp->save();

        return back();

    }


    public function updateSpp(Request $request, $id) {
        $update = [];

    // Cek dan tambahkan data yang tidak null ke dalam array $update
    if ($request->nominal !== null) {
        $update['nominal'] = $request->nominal;
    }

    if ($request->bulan !== null) {
        $update['bulan'] = $request->bulan;
    }

    Spp::where('id', $id)->update($update);

    return back();
    }

    public function destroySpp($id) {
        $petugas = Spp::findOrFail($id);
        $petugas->delete();

        return back();
    }

    public function storePetugas(Request $request) {
        $request->validate([
            'username' => 'required',
            'namaPetugas' => 'required',
            'role' => 'required',
            'password' => 'required',
        ]);

        $petugas = new Petugas();
        $petugas->username = $request['username'];
        $petugas->nama_petugas = $request['namaPetugas'];
        $petugas->role = $request['role'];
        $petugas->password = Hash::make($request['password']);
        $petugas->save();

        return back();
    }

    public function updatePetugas(Request $request, $id){
     $update = [];

    // Cek dan tambahkan data yang tidak null ke dalam array $update
    if ($request->name !== null) {
        $update['name'] = $request->name;
    }

    if ($request->username !== null) {
        $update['username'] = $request->username;
    }

    if ($request->email !== null) {
        $update['email'] = $request->email;
    }

    if ($request->role !== null) {
        $update['role'] = $request->role;
    }

    if ($request->password !== null) {
        // Jika password disertakan, hash password terlebih dahulu
        $update['password'] = Hash::make($request->password);
    }

    // Update data petugas berdasarkan ID
    Petugas::where('id', $id)->update($update);

    // Redirect kembali ke halaman sebelumnya
    return back();
    }

    public function destroyPetugas($id) {
        $petugas = Petugas::findOrFail($id);
        $petugas->delete();

        return back();
    }


    public function storeKelas(Request $request) {
        $request->validate([
            'tingkat' => 'required',
            'jurusan' => 'required',
        ]);

        $kelas = new Kelas();
        $kelas->nama_kelas = $request->tingkat;
        $kelas->jurusan = $request->jurusan;
        $kelas->save();

        return back();
    }

    public function updateKelas(Request $request, $id) 
    {
         $update = [];

    // Cek dan tambahkan data yang tidak null ke dalam array $update
    if ($request->name !== null) {
        $update['name'] = $request->name;
    }

    if ($request->username !== null) {
        $update['username'] = $request->username;
    }

    if ($request->email !== null) {
        $update['email'] = $request->email;
    }

    if ($request->role !== null) {
        $update['role'] = $request->role;
    }

    if ($request->password !== null) {
        // Jika password disertakan, hash password terlebih dahulu
        $update['password'] = Hash::make($request->password);
    }

    // Update data petugas berdasarkan ID
    Petugas::where('id', $id)->update($update);

    // Redirect kembali ke halaman sebelumnya
    return back();
    }


    public function destroyKelas($id) {
        $kelas = Kelas::findOrFail($id);
        $kelas->delete();

        return back();
    }


    public function storeSiswa(Request $request) {
        $request->validate([
            'name' => 'required',
            'nisn' => 'required',
            'nis' => 'required',
            'idKelas' => 'required',
            'no_tlp' => 'required|numeric',
            'alamat' => 'required',
            'password' => 'required'
        ]);

        $siswa = new User();
        $siswa->name = $request->name;
        $siswa->nisn = $request->nisn;
        $siswa->nis = $request->nis;
        $siswa->id_kelas = $request->idKelas;
        $siswa->alamat = $request->alamat;
        $siswa->no_telp = $request->no_tlp;
        $siswa->password = Hash::make($request->password);
        $siswa->save();

        return back();
    }


    public function destroySiswa($id) {
        $kelas = User::findOrFail($id);
        $kelas->delete();

        return back();
    }


    public function updateSiswa(Request $request, $id) {
      $update = [];

    //   dd($request->all());

    // Cek dan tambahkan data yang tidak null ke dalam array $update
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

     if ($request->kelas !== null) {
        $update['id_kelas'] = $request->kelas;
    }

     if ($request->no_telp !== null) {
        $update['no_telp'] = $request->no_telp;
    }

    if ($request->password !== null) {
        // Jika password disertakan, hash password terlebih dahulu
        $update['password'] = Hash::make($request->password);
    }

    // Update data petugas berdasarkan ID
    User::where('id', $id)->update($update);

    // Redirect kembali ke halaman sebelumnya
    return back();   
    }


    public function logoutAdmin(Request $request) {
        Auth::guard('admin')->logout();
        $request->session()->invalidate(); // Hapus session
        $request->session()->regenerateToken(); // Regenerasi token CSRF
    }
}
