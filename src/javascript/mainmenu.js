const { app, Menu, shell, dialog, nativeImage, BrowserWindow } = require('electron');
const path = require('path');
const { GetLicense } = require('./license');

const appName = app.getName();
const appIconPath = path.join(__dirname, '../../assets/icons/png/512x512.png');
const appIcon = nativeImage.createFromPath(appIconPath)
const bugReportURL = 'https://github.com/frodal/GUIwrapper/issues';

function CreateMenu() {
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
                    click() { shell.openExternal(bugReportURL) }
                },
                {
                    label: 'View License',
                    click() {
                        dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
                            type: "info",
                            title: 'License',
                            message: appName + " License\n\n" +
                                GetLicense(),
                            buttons: ['Ok'],
                            icon: appIcon
                        });
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Learn More',
                    click() { shell.openExternal('https://github.com/frodal/GUIwrapper#gui-wrapper') }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Check for Updates',
                    click() { shell.openExternal('https://github.com/frodal/GUIwrapper/releases/latest') }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'About',
                    click() {
                        const openAboutWindow = require('about-window').default;
                        openAboutWindow({
                            icon_path: appIconPath,
                            bug_report_url: bugReportURL
                        });
                    }
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

exports.CreateMenu = CreateMenu;