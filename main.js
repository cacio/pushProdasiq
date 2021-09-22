const { app, BrowserWindow,Tray,Menu,Notification,screen,dialog} = require('electron')
const url = require('url')
const path = require('path');
const { setup: setupPushReceiver } = require('electron-push-receiver');
const Positioner = require('electron-positioner');

let iconPath = path.join(__dirname, '../images/iconTemplate.png')


const NOTIFICATION_TITLE = 'Basic Notification';
const NOTIFICATION_BODY  = 'Notification from the Main process';

let mainWindow
let tray = null

// Functions must be exported to be accessible to the front-end
// Execute OS command and return result to front-end
// Another process is the IPCMaine IPCRenderer
// https://electronjs.org/docs/api/ipc-main
// https://electronjs.org/docs/api/ipc-renderer
exports.execProcess = (process, callback) => {
  const { exec } = require('child_process')
  const callExec = exec(process)

  callExec.stdout.on('data', function (data) {
    callback(data)
  })
  callExec.stderr.on('data', function (data) {
    callback("<b>ERROR:</b> \n" + data)
  })
}


const ShowMessagesApp = (conf) =>{
  new Notification(conf).show()
}

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
    width: height,
    height: 600,
    icon:iconPath,
    // Window's Visual Features 
    frame: false, // Remove top bar 
    useContentSize: false, // Inhibit window size display 

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule:true
    }
  });
  mainWindow.openDevTools();
  mainWindow.setBounds({ x: 0, y: 0, width: 400, height: height }) 
  
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  
  setupPushReceiver(mainWindow.webContents);
  let positioner = new Positioner(mainWindow);
  positioner.move('bottomRight');
  
  mainWindow.on('closed', () => {
    mainWindow = null
  });

};
app.on('ready', function(){
  //console.log("sss: "+screen.getPrimaryDisplay().size);
  const conf = {
    title: NOTIFICATION_TITLE, 
    body: NOTIFICATION_BODY,
    subtitle :"Prodasiq",
    icon :iconPath
  }
  ShowMessagesApp(conf);
  tray = new Tray(iconPath)

  let template = [
    {
        label: 'Low',
        type: 'radio',
        checked: true,
        click:()=>{
          console.log('testesss');
        }
    },
  ]

  const contextMenu = Menu.buildFromTemplate(template)
  
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Prodasiq Atualizador')

  tray.on('click',createWindow);

  
  tray.on('double-click',(e, a) => {
    console.log("doiclic");
    //console.log(e.window)
    //console.log(e.tray)
  });

})

/*app.whenReady()
  .then(createWindow)*/

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});
