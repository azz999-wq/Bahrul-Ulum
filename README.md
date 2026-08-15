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