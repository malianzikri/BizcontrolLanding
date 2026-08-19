BIZCONTROL ONLINE — LANDING PAGE SALES

Tujuan:
- Landing page hanya fokus BizControl Online.
- Excel dihilangkan dari funnel iklan.
- CTA utama: Coba Demo Gratis.
- CTA pembelian: Rp79.000/bulan (utama) dan Rp699.000 sekali bayar (sekunder).
- Meta Pixel PageView + ViewContent + InitiateCheckout tetap aktif.
- Demo dan WhatsApp memakai custom event agar tidak tercampur dengan checkout.

CARA PASANG
1. Backup repository landing page yang sekarang.
2. Ganti index.html dan styles.css dengan file dari paket ini.
3. Ganti script.js dengan file dari paket ini.
4. PERTAHANKAN config.js milik website sekarang. Jangan ditimpa jika sudah berisi link checkout Lynk, demo, WhatsApp, dan harga.
5. Pastikan config.js menyediakan key berikut di window.BIZCONTROL_LANDING.links:
   - demo
   - onlineMonthly
   - onlineLifetime
   - whatsapp
6. Pastikan prices berisi:
   - onlineMonthly
   - onlineLifetime
7. Deploy ke Vercel.
8. Tes Event Manager:
   - buka landing => PageView + ViewContent
   - klik Demo => DemoStart
   - klik Rp79.000 => InitiateCheckout value 79000
   - klik Rp699.000 => InitiateCheckout value 699000
9. Untuk campaign Sales awal, gunakan Website + pixel Biz Control dan optimasi InitiateCheckout sampai tracking Purchase benar-benar tersedia.

PENTING TENTANG PURCHASE
Landing page ini tidak mengirim Purchase karena pembayaran terjadi di Lynk. Jangan menembakkan Purchase hanya saat tombol checkout diklik. Purchase harus dikirim setelah pembayaran benar-benar berhasil, misalnya melalui integrasi checkout / webhook / success redirect yang tervalidasi.

CATATAN OFFER
- Bulanan: Rp79.000/bulan, maksimal 12 pembayaran.
- Setelah pembayaran ke-12: lisensi BizControl lunas dan biaya langganan BizControl Rp0.
- Sekali bayar: Rp699.000.
- Layanan tambahan tertentu tetap dapat berbiaya terpisah.
