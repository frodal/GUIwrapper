// Initialize the dark mode in the Main process
function Initialize() {
    const { ipcMain, nativeTheme } = require('electron');
    ipcMain.handle('dark-mode:switch', (e, shouldUseDarkColors) => {
        if (shouldUseDarkColors) {
            nativeTheme.themeSource = 'dark';
        } else {
            nativeTheme.themeSource = 'light';
        }
        return nativeTheme.shouldUseDarkColors;
    });
    ipcMain.handle('dark-mode:isDarkMode', () => {
        return nativeTheme.shouldUseDarkColors;
    });
}

// Handle the dark mode in the Renderer process
function HandleDarkMode() {
    const { ipcRenderer } = require('electron');
    let darkSwitch = document.getElementById("darkSwitch");
    if (!darkSwitch)
        return
    initTheme();
    darkSwitch.addEventListener("change", function (event) {
        resetTheme();
    });

    function initTheme() {
        if (localStorage.getItem("darkSwitch") === null) {
            // Sets the theme based on system preferences
            ipcRenderer.invoke('dark-mode:isDarkMode').then((darkThemeSelected) => {
                darkSwitch.checked = darkThemeSelected;
                ipcRenderer.invoke('dark-mode:switch', darkThemeSelected)
            });
        } else {
            // Sets the theme based on previously set state
            let darkThemeSelected = localStorage.getItem("darkSwitch") === "dark";
            darkSwitch.checked = darkThemeSelected;
            ipcRenderer.invoke('dark-mode:switch', darkThemeSelected)
        }
    }

    function resetTheme() {
        let darkThemeSelected = darkSwitch.checked;
        ipcRenderer.invoke('dark-mode:switch', darkThemeSelected)
        if (darkThemeSelected) {
            localStorage.setItem("darkSwitch", "dark");
        } else {
            localStorage.setItem("darkSwitch", "light");
        }
    }
}

exports.Initialize = Initialize;
exports.HandleDarkMode = HandleDarkMode;