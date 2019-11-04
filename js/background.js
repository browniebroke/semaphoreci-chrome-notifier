chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'semaphoreci-notifier') {
    chrome.notifications.create({
      type: 'basic',
      ...request.options
    });
  }
  return true;
});
