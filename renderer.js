// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const  fs = require('fs');
const CryptoJS = require("crypto-js");
const { ipcRenderer } = require ('electron')
const {
  START_NOTIFICATION_SERVICE,
  NOTIFICATION_SERVICE_STARTED,
  NOTIFICATION_SERVICE_ERROR,
  NOTIFICATION_RECEIVED,
  TOKEN_UPDATED,
} = require ('electron-push-receiver/src/constants');

/*const warpper = document.querySelector('wrapper'),
    toast = document.querySelector('.toast'),
    wifiicon = document.querySelector('.icon'),
    title = document.querySelector('span'),
    subtitle = document.querySelector('p');*/

  /*ajax();
  function ajax(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://jsonplaceholder.typicode.com/posts",true);
    xhr.onload = ()=>{
        console.log(xhr.response);
    }
    xhr.onerror = ()=>{}
    xhr.send();
  }*/

// Listen for service successfully started
ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
  console.log('service successfully started', token);
  document.getElementById('token').innerHTML = "Token: "+token;
})

// Handle notification errors
ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
  console.log('notification error', error)
})

// Send FCM token to backend
ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
  console.log('token updated', token)
})

// Display notification
ipcRenderer.on(NOTIFICATION_RECEIVED, (_, serverNotificationPayload) => {
  // check to see if payload contains a body string, if it doesn't consider it a silent push
  if (serverNotificationPayload.notification.body){
    // payload has a body, so show it to the user
    console.log('display notification', serverNotificationPayload)
    
    let myNotification = new Notification(serverNotificationPayload.notification.title, {
      body: serverNotificationPayload.notification.body
    })
    
    myNotification.onclick = () => {
      console.log('Notification clicked')
    }  
  } else {
    // payload has no body, so consider it silent (and just consider the data portion)
    console.log('do something with the key/value pairs in the data', serverNotificationPayload.data)
  }
})

// Start service
const senderId = '574810094655' // <-- replace with FCM sender ID from FCM web admin under Settings->Cloud Messaging
console.log('starting service and registering a client')
ipcRenderer.send(START_NOTIFICATION_SERVICE, senderId)

fs.readFile('C:/Users/cacio/Desktop/PRODA.PRO', 'utf-8', function (err, data) {
  if(err) throw err;
  console.log(data);
  
  //const bytes  = CryptoJS.AES.decrypt(data, '');
  //const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
 

});

/**
 function EnDecryptString(StrValue : String; Chave: Word) : String;
var
  I        : Integer;
  OutValue : String;
begin
  OutValue := '';
  for I := 1 to Length(StrValue) do
    OutValue := OutValue + char(Not(ord(StrValue[I])-Chave));
  Result := OutValue;
end;
*/