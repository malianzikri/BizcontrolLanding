# BizControl Landing Page

Landing page static untuk menjual:
1. BizControl Excel — sekali bayar
2. BizControl Online — cloud, pilihan cicilan 12 bulan atau sekali bayar

## Edit sebelum publish
Buka `config.js`.

Ganti link checkout Lynk:
- excelBasic
- excelPro
- excelUltimate
- onlineMonthly
- onlineLifetime

Ganti URL demo bila berbeda.
Ganti link WhatsApp bila perlu.

## Harga
Harga Excel sudah diisi:
- Basic launch Rp29.000 (normal Rp39.000)
- Pro launch Rp59.000 (normal Rp79.000)
- Ultimate launch Rp99.000 (normal Rp129.000)

Harga BizControl Online:
- Bulanan: Rp79.000/bulan maksimal 12 bulan (normal anchor Rp99.000)
- Lifetime/sekali bayar: Rp699.000 (normal anchor Rp899.000)

Setelah pembayaran bulanan ke-12, biaya langganan BizControl menjadi Rp0.
Layanan tambahan seperti custom development, storage ekstra, integrasi berbayar,
atau fitur premium baru dapat dikenakan biaya terpisah bila digunakan.

Kalau mau ganti harga/link, cukup edit `config.js`.

## Deploy Vercel
Upload file ke GitHub lalu Import Project di Vercel.

Framework Preset: Other
Build Command: kosong
Output Directory: kosong

## Funnel
Iklan / Thread / WhatsApp
→ Landing Page
→ Pilih Excel atau Online
→ Checkout Lynk
→ Delivery / onboarding
