const {app, Menu, shell, dialog, nativeImage, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');

const appName = app.getName();
const appIcon = nativeImage.createFromPath(path.join(__dirname,'../../assets/icons/png/64x64.png'))
let licenseString = '';

function GetLicense()
{
    if(licenseString==='')
    {
        try
        {
            licenseString = fs.readFileSync(path.join(__dirname,'../../LICENSE.md'));
        }catch(err)
        {
            licenseString = 'Copyright (c) 2019-2020 Bjørn Håkon Frodal';
        }
    }
    return licenseString;
};

const template = [
  {
    role: 'window',
    submenu: [
      {
        role: 'reload'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      },
      {
        type: 'separator'
      },
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Report Issue',
        click () { shell.openExternal('https://github.com/frodal/GUIwrapper/issues') }
      },
      {
        label: 'View License',
        click () {
            GetLicense();
            dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                type:"info",
                title: 'License',
                message: appName+" License\n\n"+
                        licenseString,
                buttons:['Ok'],
                icon: appIcon
            });
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Learn More',
        click () { shell.openExternal('https://github.com/frodal/GUIwrapper#gui-wrapper') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Check for Updates',
        click () { shell.openExternal('https://github.com/frodal/GUIwrapper/releases/latest') }
      },
      {
        type: 'separator'
      },
      {
        label: 'About',
        click () {
            dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                type:"info",
                title: 'About '+appName,
                message: appName +"\n"+
                        "Version: "+app.getVersion()+"\n\n"+
                        "Built with \n"+
                        "Electron: "+process.versions.electron+"\n"+
                        "Chrome: "+process.versions.chrome+"\n"+
                        "Node.js: "+process.versions.node,
                buttons:['Ok'],
                icon: appIcon
            });
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);