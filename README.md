# Bahrul Ulum Singaparna

Website profil, informasi PPDB, berita, dan panel pengelolaan Pondok Pesantren Bahrul Ulum Singaparna.

## Pembaruan

- Galeri beranda menggunakan ukuran tile seragam untuk semua foto.
- Tampilan admin diperbarui dengan navigasi responsif, form, tabel, dan kartu statistik yang dirapikan.
- Login admin menyediakan reset password melalui Firebase Authentication.
- Form login dan reset password menampilkan Cloudflare Turnstile. Token diverifikasi oleh Pages Function sebelum permintaan diteruskan ke Firebase Authentication.

## Alur Turnstile

1. Pengguna menyelesaikan verifikasi Turnstile di `admin-panel.html`.
2. Browser mengirim token ke endpoint `/api/verify-turnstile`.
3. `functions/api/verify-turnstile.js` memeriksa token ke Cloudflare Siteverify menggunakan secret server.
4. Jika token valid dan hostname sesuai, halaman melanjutkan login atau permintaan reset password ke Firebase Authentication.

## Konfigurasi Deploy

- Deploy sebagai Cloudflare Pages agar file di folder `functions/` dijalankan sebagai Pages Function.
- Simpan Secret Key Turnstile sebagai secret environment variable bernama `TURNSTILE_SECRET_KEY` di Cloudflare Pages. Site Key di halaman login bersifat publik; Secret Key tidak disimpan di source code.
- Tambahkan hostname Pages atau domain kustom ke pengaturan widget Turnstile.
- Perubahan environment variable berlaku pada deployment berikutnya.
- Email reset dikirim melalui Firebase Authentication. Domain situs perlu terdaftar di Authorized domains Firebase.

## Batasan

Turnstile memverifikasi alur login dari halaman admin. Firebase Authentication tetap merupakan endpoint publik yang dapat dipanggil langsung oleh klien; verifikasi Turnstile di Pages Function tidak mengubah endpoint Firebase tersebut.