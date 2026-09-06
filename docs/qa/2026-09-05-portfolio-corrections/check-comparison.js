return await (async () => {
 const select = document.querySelector('#view');
 const results = [];
 for (const option of select.options) {
  select.value = option.value;
  select.dispatchEvent(new Event('change', {bubbles: true}));
  const images = [...document.querySelectorAll('#comparison img')];
  await Promise.all(images.map(image => image.decode()));
  results.push({view: option.value, description: document.querySelector('#description').textContent, images: images.map(image => ({src: image.getAttribute('src'), width: image.naturalWidth, height: image.naturalHeight})), overflow: document.documentElement.scrollWidth > innerWidth});
 }
 select.value = 'desktop-projects';
 select.dispatchEvent(new Event('change', {bubbles: true}));
 await Promise.all([...document.querySelectorAll('#comparison img')].map(image => image.decode()));
 return results;
})();
