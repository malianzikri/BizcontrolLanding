(function(){
  const cfg = window.BIZCONTROL_LANDING || {prices:{},links:{}};
  document.querySelectorAll('[data-link]').forEach(a => {
    const key = a.dataset.link;
    if(cfg.links && cfg.links[key]){
      a.href = cfg.links[key];
      if(key !== 'demo') a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
  document.querySelectorAll('[data-price]').forEach(el => {
    const key = el.dataset.price;
    if(cfg.prices && cfg.prices[key]) el.textContent = cfg.prices[key];
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();