// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const {ipcMain, dialog} = require('electron')

// Open file dialog to open file
ipcMain.on('open-file-dialog', (event)=>
{
  dialog.showOpenDialog(
      {properties: ['openFile']}, 
      (files)=>
  {
      if(files)
      {
          event.sender.send('SelectedFile', files)
      }
  })
})

// Opens an error dialog message
ipcMain.on('open-error-dialog', (event)=>
{
    dialog.showErrorBox('Error', 'Could not execute the selected program!\nPlease select a valid executable program')
})

// Opens a warning dialog message
ipcMain.on('open-warning-dialog', (event)=>
{
    const options = 
    {
        type:"info",
        title:"Warning",
        message:"Please select an executable file first!",
        buttons:['Ok']
    }
    dialog.showMessageBox(options)
})

// Opens a warning dialog message
ipcMain.on('open-isRunning-dialog', (event)=>
{
    const options = 
    {
        type:"info",
        title:"Warning",
        message:"Please close the running application before starting a new one",
        buttons:['Ok']
    }
    dialog.showMessageBox(options)
})