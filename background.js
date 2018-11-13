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
  // send parsed icons to options ui
  browser.runtime.sendMessage({ icons: icons });
};

browser.runtime.onMessage.addListener(handleMessage);
