// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron');
const {execFile} = require('child_process');

const selectProgramBtn = document.getElementById('SelectProgramBtn');
const startProgramBtn = document.getElementById('StartProgramBtn');
const terminateProgramBtn = document.getElementById('TerminateProgramBtn');
const inputArgs = document.getElementById('InputArgs');
let exePath = '';
let exeCommandArgs = [''];
let subProcess = null;

////////////////////////////////////////////////////////////////////////////////////
//                               Select Program                                   //
////////////////////////////////////////////////////////////////////////////////////
// Sets select program button callback
selectProgramBtn.addEventListener('click', (event)=>
{
    console.log('Select Button clicked!');
    ipcRenderer.send('open-file-dialog');
});
// Sets the executable filepath received from the main process (main.js)
ipcRenderer.on('SelectedFile', (event, path)=>
{
    document.getElementById('FilePath').innerHTML = `${path.toString()}`;
    exePath = path.toString();
});

////////////////////////////////////////////////////////////////////////////////////
//                                Start Program                                   //
////////////////////////////////////////////////////////////////////////////////////
// Sets start program button callback
startProgramBtn.addEventListener('click', (event)=>
{
    console.log('Start Button clicked!');
    if(exePath!=='')
    {
        if(subProcess!==null) // Check if a subprocess is already running
        {
            ipcRenderer.send('open-isRunning-dialog');
        }else
        {
            // Clear output data field
            document.getElementById('OutputData').innerHTML = '';
            exeCommandArgs = [inputArgs.value];
            console.log(exeCommandArgs);
            try // Try to execute the program and sets a callback for when the program terminates
            {
                subProcess = execFile(exePath, exeCommandArgs, function(err, data)
                {
                    if(err!==null && !subProcess.killed)
                    {
                        ipcRenderer.send('open-errorEXE-dialog');
                    }else
                    {
                        ipcRenderer.send('open-successfulTermination-dialog');
                    }
                    console.log(err);
                    console.log(data.toString());
                    // sets the output data and replacing \n with <br/> performs a global replacement with /\n/g
                    document.getElementById('OutputData').innerHTML = `${data.toString().replace(/\n/g,'<br/>')}`;
                    subProcess = null;
                });
                subProcess.stdout.on('data',function(data) {
                    document.getElementById('OutputData').innerHTML = `${data.toString().replace(/\n/g,'<br/>')}`;
                });
            }
            catch(err) // Catches the error if the file selected can't be executed correctly
            {
                subProcess = null;
                console.log(err);
                ipcRenderer.send('open-error-dialog');
                // sets the output data and replacing \n with <br/> performs a global replacement with /\n/g
                document.getElementById('OutputData').innerHTML = `${err.toString().replace(/\n/g,'<br/>')} <br/>`;
            }
        }
    }else
    {
        // Sends a warning no file path is selected
        console.log('Please select an executable file first!');
        ipcRenderer.send('open-warning-dialog');
    }
});

////////////////////////////////////////////////////////////////////////////////////
//                               Terminate Program                                //
////////////////////////////////////////////////////////////////////////////////////
// Sets terminate program button callback
terminateProgramBtn.addEventListener('click', (event)=>
{
    if(subProcess!==null)
    {
        subProcess.kill();
    }else
    {
        ipcRenderer.send('open-successfulTermination-dialog');
    }
});

////////////////////////////////////////////////////////////////////////////////////
//                Handle close/minimize/maximize button events                    //
////////////////////////////////////////////////////////////////////////////////////
const remote = require('electron').remote;

(function handleWindowControls() 
{
    // When document has loaded, initialise
    document.onreadystatechange = () => 
    {
        if (document.readyState == "complete") 
        {
            init();
        }
    };

    function init() 
    {
        let window = remote.getCurrentWindow();
        const minButton = document.getElementById('min-button');
        const maxButton = document.getElementById('max-button');
        const restoreButton = document.getElementById('restore-button');
        const closeButton = document.getElementById('close-button');

        minButton.addEventListener("click", (event) => 
        {
            window = remote.getCurrentWindow();
            window.minimize();
        });

        maxButton.addEventListener("click", (event) => 
        {
            window = remote.getCurrentWindow();
            window.maximize();
            toggleMaxRestoreButtons();
        });

        restoreButton.addEventListener("click", (event) => 
        {
            window = remote.getCurrentWindow();
            window.unmaximize();
            toggleMaxRestoreButtons();
        });

        closeButton.addEventListener("click", (event) => 
        {
            window = remote.getCurrentWindow();
            window.close();
        });

        // Toggle maximise/restore buttons when maximisation/unmaximisation
        // occurs by means other than button clicks e.g. double-clicking
        // the title bar:
        toggleMaxRestoreButtons();
        window.on('maximize', toggleMaxRestoreButtons);
        window.on('unmaximize', toggleMaxRestoreButtons);

        function toggleMaxRestoreButtons() 
        {
            window = remote.getCurrentWindow();
            if (window.isMaximized()) 
            {
                maxButton.style.display = "none";
                restoreButton.style.display = "flex";
            } else 
            {
                restoreButton.style.display = "none";
                maxButton.style.display = "flex";
            }
        }
    }
})();