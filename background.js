
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({scripts:[]},
    function() {console.log('Installed "Script Runner"');
  });
}); // end onInstalled

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  chrome.storage.sync.get('scripts', function(data){
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      if (changeInfo.status == 'complete' && tab.url){
        for(let i = 0; i < data.scripts.length; i++){
          if(tab.url.includes(Object.keys(data.scripts[i])[0])){
            chrome.tabs.executeScript(tabId, 
              {code: '(console.log(`Script Runner:\n\tRunning script for: "'+Object.keys(data.scripts[i])[0]+'"`),eval("'+Object.values(data.scripts[i])[0]+'"))'}
            );
          }
        }
      }
    });
  });
});
