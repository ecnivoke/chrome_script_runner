
let form = document.getElementById('form');
let saveBtn = document.getElementById('saveBtn');

function constructForm(){

  chrome.storage.sync.get('scripts', function(data){

    for(let script of data.scripts){

      let label = document.createElement('input');
      label.value = Object.keys(script)[0];

      let textarea = document.createElement('textarea');
      textarea.value = Object.values(script)[0];

      form.appendChild(label);
      form.appendChild(textarea);
    }
  });
}

saveBtn.onclick = ()=>{

  let newScripts = [];
  let keys = document.getElementsByTagName('input');
  let values = document.getElementsByTagName('textarea');

  for(let i = 0; i < keys.length; i++){
    if(keys[i].value != '' && values[i].value != '')
      newScripts.push({[keys[i].value]:values[i].value});
  }

  chrome.storage.sync.set({scripts:newScripts}, function(){
    alert('Scripts saved!');
    window.location.reload();
  });
}

constructForm();
