chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'semaphoreci-notifier') {
    chrome.notifications.create(request.options);
  }
  return true;
});
