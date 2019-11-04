// Constants
const PASSED_STRING = '[passed]';
const FAILED_STRING = '[failed]';

// TODO: Normalise the extensions API
// window.browser = (function () {
//   return window.msBrowser ||
//     window.browser ||
//     window.chrome;
// })();

function handleTitleChanged(mutation) {
  const innerHTML = mutation.target.innerHTML;
  console.log(innerHTML);
  if (innerHTML.includes(PASSED_STRING)) {
    console.log('Build OK!');
    chrome.runtime.sendMessage({
      type: 'semaphoreci-notifier', options: {
        type: 'basic',
        iconUrl: chrome.extension.getURL('images/passed.png'),
        title: 'Build OK!',
        message: innerHTML
      }
    });
    return
  }
  if (innerHTML.includes(FAILED_STRING)) {
    console.log('Build Failed!');
    chrome.runtime.sendMessage({
      type: 'semaphoreci-notifier', options: {
        type: 'basic',
        iconUrl: chrome.extension.getURL('images/failed.png'),
        title: 'Build Failed!',
        message: innerHTML
      }
    });
    return
  }
  console.log('Build Not Finished...');
}

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.target.nodeName === 'TITLE' && mutation.addedNodes.length) {
      handleTitleChanged(mutation);
    }
  })
});

observer.observe(document.querySelector('head'), {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});

console.log('SemaphoreCI Notifier active!');
