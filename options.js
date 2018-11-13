'use strict';

const handleMessage = message => {
  console.log('Got message from background script', message);
  const icons = message.icons;
  const iconUrls = icons.map(icon => {
    const url = URL.createObjectURL(new Blob([icon.buffer], { type: 'image/png' }));
    return url;
  });
  iconUrls.forEach(url => {
    const image = new Image();
    image.src = url;
    document.querySelector('#output').appendChild(image);
  });
};

browser.runtime.onMessage.addListener(handleMessage);

document.querySelector('#input').addEventListener('submit', async (event) => {
  event.preventDefault();
  const faviconUrl = document.querySelector('#favicon-url').value;
  // send favicon url to background script
  browser.runtime.sendMessage({ url: faviconUrl });
});
