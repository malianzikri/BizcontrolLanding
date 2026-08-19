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
    const configured = cfg.links && cfg.links[key];
    if(configured){
      el.href = withTracking(configured);
      if(key !== 'demo') el.target = '_blank';
      el.rel = 'noopener noreferrer';
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
    } else if(key === 'whatsapp'){
      el.addEventListener('click', function(){
        fbTrackCustom('ContactAdmin', {content_name:'BizControl Online'});
      });
    }
  });

  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.dataset.price;
    if(cfg.prices && cfg.prices[key]) el.textContent = String(cfg.prices[key]).replace(/^Rp\s*/i,'');
  });

  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();
})();
