return await (async () => {
  await document.fonts.ready;
  for (const image of document.images) {
    image.scrollIntoView({ behavior: 'instant' });
    await image.decode();
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const root = document.documentElement;
  const rect = element => {
    const bounds = element.getBoundingClientRect();
    return { top: bounds.top, bottom: bounds.bottom, width: bounds.width, height: bounds.height };
  };
  const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
  const localLinks = [...new Set([...document.querySelectorAll('a[href]')].map(element => element.href))].filter(href => href.startsWith(location.origin) && !new URL(href).hash);
  const assets = await Promise.all(localLinks.map(async href => ({ path: new URL(href).pathname, status: (await fetch(href, { method: 'HEAD' })).status })));
  return {
    url: location.href,
    viewport: { width: innerWidth, height: innerHeight },
    pageHeight: root.scrollHeight,
    clientWidth: root.clientWidth,
    scrollWidth: root.scrollWidth,
    horizontalOverflow: root.scrollWidth > root.clientWidth,
    heroActions: rect(document.querySelector('.hero__actions')),
    sections: [...document.querySelectorAll('main > section')].map(element => ({ id: element.id, ...rect(element) })),
    images: [...document.images].map(element => ({ src: element.getAttribute('src'), complete: element.complete, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight, alt: element.alt })),
    brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(element => !document.getElementById(element.hash.slice(1))).map(element => element.hash),
    duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
    headings: [...document.querySelectorAll('h1')].map(element => element.textContent),
    assets,
  };
})()
