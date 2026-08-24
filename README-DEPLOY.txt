BIZCONTROL ONLINE V3 — ASSISTED CLOSING VIA WHATSAPP
=================================================

Tujuan
------
Mengubah ujung funnel dari direct checkout-only menjadi:
Landing/Demo -> Chat Admin -> Admin bantu aktivasi -> kirim link bayar -> Purchase.

Direct checkout TIDAK dihapus. Tetap tersedia sebagai opsi sekunder bagi orang yang sudah yakin.

Perubahan Landing
-----------------
1. Hero CTA pembelian -> Chat Admin.
2. Ada box "Tidak harus langsung bayar sendiri".
3. Paket Rp79.000: CTA utama WhatsApp, direct Lynk jadi opsi kedua.
4. Paket Rp699.000: CTA utama WhatsApp, direct Lynk jadi opsi kedua.
5. CTA final/mobile -> WhatsApp.
6. Alur aktivasi dijelaskan sebagai assisted activation.

Tracking Meta
-------------
- Klik WhatsApp paket bulanan -> standard event Lead value 79000 + custom WhatsAppSalesClick.
- Klik WhatsApp paket lifetime -> standard event Lead value 699000 + custom WhatsAppSalesClick.
- Klik direct checkout Lynk -> tetap InitiateCheckout.
- Purchase tetap HANYA boleh dikirim setelah pembayaran benar-benar sukses.

Cara Deploy Landing
-------------------
1. Backup repository landing sekarang.
2. Ganti index.html, styles.css, script.js dengan file V3 ini.
3. Jangan timpa config.js production.
4. Tambahkan `whatsappMonthly` dan `whatsappLifetime` sesuai CONFIG-PATCH.txt.
5. Deploy Vercel.

Cara Ubah CTA POS Demo
----------------------
Kalau Demo Conversion Add-on sudah terpasang:
1. Di project POS, ganti isi `demo-sales-config.js` dengan isi file:
   POS-demo-sales-config-assisted.js
2. `demo-sales-layer.js` dan CSS tidak perlu diubah.
3. Deploy POS.

Setelah itu tombol "Aktifkan Rp79rb" dari POS Demo akan langsung membuka WhatsApp Admin.

Flow final
----------
Meta Ads -> Landing -> Demo -> POS Demo -> Chat Admin -> link Lynk dikirim Admin -> pembayaran -> aktivasi Owner.

Pesan WhatsApp default
---------------------
Halo Admin BizControl, saya sudah melihat/coba demo BizControl Online dan ingin aktivasi paket Rp79.000/bulan. Bisa dibantu proses aktivasi dan pembayarannya?


NOMOR WHATSAPP CLOSING FINAL
---------------------------
0811-7199-210
wa.me format: 628117199210


V3.1 HOTFIX — TOMBOL WHATSAPP
-----------------------------
Masalah V3:
CTA whatsappMonthly / whatsappLifetime bisa tetap href="#" bila config.js production
belum mempunyai key baru tersebut.

V3.1:
- punya fallback WA internal ke 0811-7199-210
- tetap memprioritaskan config.js jika key tersedia
- WA tidak lagi dipaksa target=_blank agar handoff ke aplikasi WA lebih stabil di mobile
- direct checkout Lynk tetap bekerja seperti sebelumnya
- tracking Lead + WhatsAppSalesClick tetap dipertahankan

TEST WAJIB SETELAH DEPLOY
1. Hero -> Chat Admin — Aktifkan Rp79.000
2. Box harga -> Chat Admin BizControl
3. Paket bulanan -> Chat Admin — Aktifkan Rp79.000/bulan
4. Paket lifetime -> Chat Admin — Paket Sekali Bayar
5. CTA final -> Chat Admin — Mulai Rp79.000
6. Sticky mobile -> Chat Admin
7. Footer -> WhatsApp Admin

Semua harus menuju nomor 0811-7199-210.
