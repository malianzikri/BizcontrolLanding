(function(){
  const cfg = window.BIZCONTROL_LANDING || {prices:{},links:{}};

  const products = {
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

  // Fallback link agar CTA WhatsApp tetap berfungsi walau config.js production
  // belum memiliki key assisted-closing terbaru.
  const fallbackLinks = {
    whatsapp: 'https://wa.me/628117199210?text=Halo%20Admin%20BizControl%2C%20saya%20ingin%20tanya%20tentang%20BizControl%20Online.',
    whatsappMonthly: 'https://wa.me/628117199210?text=Halo%20Admin%20BizControl%2C%20saya%20sudah%20melihat%2Fcoba%20demo%20BizControl%20Online%20dan%20ingin%20aktivasi%20paket%20Rp79.000%2Fbulan.%20Bisa%20dibantu%20proses%20aktivasi%20dan%20pembayarannya%3F',
    whatsappLifetime: 'https://wa.me/628117199210?text=Halo%20Admin%20BizControl%2C%20saya%20ingin%20aktivasi%20BizControl%20Online%20paket%20sekali%20bayar%20Rp699.000.%20Bisa%20dibantu%20proses%20aktivasi%20dan%20pembayarannya%3F'
  };

  function resolveLink(key){
    return (cfg.links && cfg.links[key]) || fallbackLinks[key] || null;
  }

  function fbTrack(event, params){
    if(typeof window.fbq === 'function') window.fbq('track', event, params || {});
  }

  function fbTrackCustom(event, params){
    if(typeof window.fbq === 'function') window.fbq('trackCustom', event, params || {});
  }

  // Product-specific landing page: one meaningful content view per page load.
  fbTrack('ViewContent', {
    content_ids: ['bizcontrolOnline'],
    content_name: 'BizControl Online',
    content_category: 'BizControl Online',
    content_type: 'product',
    currency: 'IDR'
  });

  const currentTracking = new URLSearchParams(location.search);
  const passthroughKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];

  function withTracking(rawUrl){
    if(!rawUrl || rawUrl === '#') return rawUrl;
    try{
      const url = new URL(rawUrl, location.href);
      passthroughKeys.forEach(k => {
        const v = currentTracking.get(k);
        if(v && !url.searchParams.has(k)) url.searchParams.set(k, v);
      });
      return url.toString();
    }catch(_){
      return rawUrl;
    }
  }

  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    const configured = resolveLink(key);
    const isWhatsApp = key === 'whatsapp' || key === 'whatsappMonthly' || key === 'whatsappLifetime';

    if(configured){
      el.href = isWhatsApp ? configured : withTracking(configured);

      // WhatsApp dibuka di tab yang sama agar lebih stabil di mobile/app handoff.
      if(isWhatsApp || key === 'demo'){
        el.removeAttribute('target');
      }else{
        el.target = '_blank';
      }

      el.rel = 'noopener noreferrer';
    }else{
      // Jangan biarkan CTA terlihat bisa diklik kalau link memang belum dikonfigurasi.
      el.setAttribute('aria-disabled', 'true');
      el.addEventListener('click', function(e){
        e.preventDefault();
        console.error('[BizControl] Link belum dikonfigurasi:', key);
      });
    }

    if(products[key]){
      el.addEventListener('click', function(){
        const p = products[key];
        fbTrack('InitiateCheckout', {
          content_ids: [key],
          content_name: p.name,
          content_category: p.category,
          content_type: 'product',
          value: p.value,
          currency: 'IDR',
          num_items: 1
        });
      });
    } else if(key === 'demo'){
      el.addEventListener('click', function(){
        fbTrackCustom('DemoStart', {content_name:'BizControl Online Demo'});
      });
    } else if(key === 'whatsappMonthly'){
      el.addEventListener('click', function(){
        fbTrack('Lead', {
          content_name:'BizControl Online - Assisted Closing Monthly',
          content_category:'BizControl Online',
          value:79000,
          currency:'IDR'
        });
        fbTrackCustom('WhatsAppSalesClick', {plan:'monthly', value:79000, currency:'IDR'});
      });
    } else if(key === 'whatsappLifetime'){
      el.addEventListener('click', function(){
        fbTrack('Lead', {
          content_name:'BizControl Online - Assisted Closing Lifetime',
          content_category:'BizControl Online',
          value:699000,
          currency:'IDR'
        });
        fbTrackCustom('WhatsAppSalesClick', {plan:'lifetime', value:699000, currency:'IDR'});
      });
    } else if(key === 'whatsapp'){
      el.addEventListener('click', function(){
        fbTrackCustom('ContactAdmin', {content_name:'BizControl Online', purpose:'support'});
      });
    }
  });

  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.dataset.price;
    if(cfg.prices && cfg.prices[key]) el.textContent = String(cfg.prices[key]).replace(/^Rp\s*/i,'');
  });

  // Funnel diagnostics for CRO. Do not use these custom events as the Sales optimization event.
  let pricingTracked = false;
  let scroll75Tracked = false;

  const priceSection = document.getElementById('harga');
  if(priceSection && 'IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !pricingTracked){
          pricingTracked = true;
          fbTrackCustom('PricingView', {content_name:'BizControl Online Pricing'});
          observer.disconnect();
        }
      });
    }, {threshold:0.35});
    observer.observe(priceSection);
  }

  window.addEventListener('scroll', function(){
    if(scroll75Tracked) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if(max > 0 && window.scrollY / max >= 0.75){
      scroll75Tracked = true;
      fbTrackCustom('Scroll75', {content_name:'BizControl Online Landing'});
    }
  }, {passive:true});

  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();
