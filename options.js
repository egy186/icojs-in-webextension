'use strict';

const handleMessage = message => {
  console.log('Got message from background script', message);
  const icons = message.icons;
  icons.forEach(url => {
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
