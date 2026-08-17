(function(){
  const cfg = window.BIZCONTROL_LANDING || {prices:{},links:{}};

  // Data produk untuk tracking Meta Pixel
  const checkoutProducts = {
    excelBasic: {
      name: 'BizControl Excel Basic',
      category: 'BizControl Excel',
      value: 29000
    },

    excelPro: {
      name: 'BizControl Excel Pro',
      category: 'BizControl Excel',
      value: 59000
    },

    excelUltimate: {
      name: 'BizControl Excel Ultimate',
      category: 'BizControl Excel',
      value: 99000
    },

    onlineMonthly: {
      name: 'BizControl Online - Bulanan',
      category: 'BizControl Online',
      value: 79000
    },

    onlineLifetime: {
      name: 'BizControl Online - Sekali Bayar',
      category: 'BizControl Online',
      value: 699000
    }
  };

  function trackInitiateCheckout(key){
    const product = checkoutProducts[key];

    // Kalau Pixel belum aktif, link tetap jalan normal
    if(!product || typeof window.fbq !== 'function') return;

    fbq('track', 'InitiateCheckout', {
      content_ids: [key],
      content_name: product.name,
      content_category: product.category,
      content_type: 'product',
      value: product.value,
      currency: 'IDR',
      num_items: 1
    });
  }

  // Setting link dari config.js
  document.querySelectorAll('[data-link]').forEach(a => {
    const key = a.dataset.link;

    if(cfg.links && cfg.links[key]){
      a.href = cfg.links[key];

      if(key !== 'demo'){
        a.target = '_blank';
      }

      a.rel = 'noopener noreferrer';
    }

    // Hanya tombol pembelian yang dihitung InitiateCheckout
    if(checkoutProducts[key]){
      a.addEventListener('click', function(){
        trackInitiateCheckout(key);
      });
    }
  });

  // Setting harga dari config.js
  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.dataset.price;

    if(cfg.prices && cfg.prices[key]){
      el.textContent = cfg.prices[key];
    }
  });

  // Tahun footer
  const year = document.getElementById('year');

  if(year){
    year.textContent = new Date().getFullYear();
  }

})();
