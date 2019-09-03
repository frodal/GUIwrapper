const {app, Menu, shell, dialog, nativeImage} = require('electron');
const path = require('path')

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
        click () { shell.openExternal('https://github.com/frodal/GUIwrapper/blob/master/LICENSE.md') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Learn More',
        click () { shell.openExternal('https://github.com/frodal/GUIwrapper') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Check for Updates',
        click () { shell.openExternal('https://github.com/frodal/GUIwrapper/releases') }
      },
      {
        type: 'separator'
      },
      {
        label: 'About',
        click () {
            dialog.showMessageBox({
                type:"info",
                title: app.getName(),
                message: app.getName()+"\n"+
                        "Version: "+app.getVersion()+"\n\n"+
                        "Built with \n"+
                        "Electron: "+process.versions.electron+"\n"+
                        "Chrome: "+process.versions.chrome+"\n"+
                        "Node.js: "+process.versions.node,
                buttons:['Ok'],
                icon: nativeImage.createFromPath(path.join(__dirname,'../../assets/icons/png/64x64.png'))
            });
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);