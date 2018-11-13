'use strict';

console.log(ICO);

const getFavicon = async (url) => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  // convert from ico to png
  const icons = await ICO.parse(buffer, 'image/png');
  return icons;
}

const handleMessage = async (request) => {
  console.log('Got message from options ui', request);
  const faviconUrl = request.url;
  const icons = await getFavicon(faviconUrl);
  const iconUrls = icons.map(icon => {
    const url = URL.createObjectURL(new Blob([icon.buffer], { type: 'image/png' }));
    return url;
  });
  // send icon urls to options ui
  browser.runtime.sendMessage({ icons: iconUrls });
};

browser.runtime.onMessage.addListener(handleMessage);
