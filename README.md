# Website Resmi Pondok Pesantren Bahrul Ulum Singaparna

Platform web profil, informasi PPDB, berita, dan panel manajemen struktur kepengurusan Pondok Pesantren Bahrul Ulum Singaparna.

## Ringkasan Perbaikan & Optimasi

1. **Keamanan & Performa**:
   - Sentralisasi inisialisasi Firebase dan pustaka utilitas sanitasi XSS (`firebase-init.js`).
   - Optimalisasi manipulasi DOM menggunakan `DocumentFragment` untuk mengurangi *browser reflow*.

2. **Perbaikan Tampilan & Responsivitas**:
   - Pembersihan duplikasi styling CSS (`.gallery-item`).
   - Penyesuaian garis bagan dinamis pada bagan organisasi berbasis `ResizeObserver`.
   - Implementasi *passive event listener* untuk navigasi mobile.

## Perubahan Refactor

- Rendering kartu berita dan media artikel dipusatkan di `assets/js/news-utils.js` agar halaman beranda, daftar berita, dan detail berita memakai helper yang sama.
- Halaman `contact.html`, `privacy.html`, dan `terms.html` memakai layout header/footer serta komponen legal/contact bersama dari `css/style.css`; style inline khusus halaman dihapus.
- Form kontak saat ini masih berupa demo di sisi browser. Pesan tidak dikirim atau disimpan ke server.
- Form admin memvalidasi dan membatasi panjang input sebelum menyimpan data ke Firestore. Validasi browser bukan pengganti aturan keamanan database.

## Catatan Keamanan Firebase

- Terapkan Firestore Security Rules di Firebase Console agar koleksi publik hanya dapat dibaca sesuai kebutuhan dan operasi tulis dibatasi untuk admin terautentikasi. Konfigurasi Firebase di browser bukan rahasia; keamanan harus ditegakkan oleh rules.
- Setelah mengubah rules, uji akses baca dan tulis menggunakan akun publik dan admin sebelum deploy.

### Autentikasi Admin

- Halaman `admin-panel.html` memakai Firebase Authentication dengan penyedia Email/Password. Tautan **Lupa password?** mengirim email reset melalui `sendPasswordResetEmail`; pastikan template reset password di Firebase Authentication sudah dikonfigurasi dan domain situs tercantum di Authorized domains.
- Form login dan reset password memakai Cloudflare Turnstile. Pages Function `functions/api/verify-turnstile.js` memverifikasi token melalui Siteverify sebelum Firebase Auth dipanggil.
- Untuk deploy di Cloudflare Pages, tambahkan `TURNSTILE_SECRET_KEY` sebagai secret environment variable di **Settings → Variables and Secrets** untuk environment Production dan Preview yang digunakan. Jangan menaruh Secret Key di HTML atau repository. Site Key bersifat publik dan sudah dipasang di halaman login.
- Tambahkan hostname deployment (`*.pages.dev` dan/atau domain kustom) ke widget Turnstile. Verifikasi backend juga mencocokkan hostname token dengan hostname request.
- Turnstile menambah pemeriksaan pada alur halaman, tetapi Firebase Authentication tetap dapat dipanggil langsung dari klien. Untuk enforcement CAPTCHA pada API Firebase Auth, aktifkan proteksi reCAPTCHA Identity Platform seperti dijelaskan di bawah.
- Proteksi reCAPTCHA untuk login email/password tidak diaktifkan hanya dengan mengubah HTML. Aktifkan integrasi reCAPTCHA Enterprise untuk Identity Platform pada proyek Firebase agar Firebase Authentication memverifikasi permintaan login di sisi server. Firebase Web SDK yang digunakan halaman admin mendukung integrasi ini.
- Mulai dengan enforcement mode `AUDIT`, daftarkan domain situs pada pengaturan keamanan Identity Platform, lalu pantau metrik reCAPTCHA. Setelah alur login terverifikasi, ubah enforcement ke `ENFORCE`. Ikuti [panduan resmi integrasi reCAPTCHA Identity Platform](https://docs.cloud.google.com/identity-platform/docs/recaptcha-enterprise); penggunaan reCAPTCHA Enterprise dapat menimbulkan biaya.