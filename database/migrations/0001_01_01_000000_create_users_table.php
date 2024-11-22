<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nisn');
            $table->string('nis');
            $table->integer('id_kelas');
            $table->text('alamat');
            $table->string('no_telp');
         
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('petugas', function(Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('nama_petugas');
            $table->string('password');
            $table->enum('role', ['admin', 'petugas'])->default('admin');
        });

        Schema::create('spp', function(Blueprint $table) {
            $table->id();
            $table->integer('nominal');
        });

        Schema::create('pembayaran', function(Blueprint $table) {
            $table->id();
            $table->string('id_siswa');
            $table->string('id_spp');
            $table->integer('jumlah_bayar');
        });

         Schema::create('kelas', function(Blueprint $table) {
            $table->id();
            $table->string('nama_kelas');
            $table->string('jurusan');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
