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
