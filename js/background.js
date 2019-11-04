chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'semaphoreci-notifier') {
    chrome.notifications.create(request.options, function callback(notificationId) {
      console.log(`Callaback for ${notificationId}`);
    });
  }
  return true;
});
