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