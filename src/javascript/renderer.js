// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron');

const selectProgramBtn = document.getElementById('SelectProgramBtn');
const startProgramBtn = document.getElementById('StartProgramBtn');
const terminateProgramBtn = document.getElementById('TerminateProgramBtn');
const inputArgs = document.getElementById('InputArgs');
const roller = document.getElementById('lds-roller');
const runMsg = document.getElementById('running');
const outArea = document.getElementById('OutputData');
const filePathArea = document.getElementById('FilePath');

let exePath = '';
let exeCommandArgs = [''];
let subProcess = null;
let stdoutput = '';
let killedDueToError = false;

////////////////////////////////////////////////////////////////////////////////////
//                               Select Program                                   //
////////////////////////////////////////////////////////////////////////////////////
// Sets select program button callback
selectProgramBtn.addEventListener('click', (event) => {
    ipcRenderer.send('open-file-dialog');
});
// Sets the executable filepath received from the main process (main.js)
ipcRenderer.on('SelectedFile', (event, path) => {
    filePathArea.innerHTML = `${path.toString()}`;
    exePath = path.toString();
    startProgramBtn.disabled = exePath === '';
});

////////////////////////////////////////////////////////////////////////////////////
//                                Start Program                                   //
////////////////////////////////////////////////////////////////////////////////////
// Sets start program button callback
startProgramBtn.addEventListener('click', (event) => {
    if (exePath !== '') {
        if (subProcess !== null) // Check if a subprocess is already running
        {
            ipcRenderer.send('open-isRunning-dialog');
        } else {
            // Clear output data field
            outArea.innerHTML = '';
            exeCommandArgs = [inputArgs.value];
            // Sets the current working directory of the selected program to be its own directory
            const path = require('path');
            options = { cwd: path.dirname(exePath) };
            // disable start button and enable terminate button when program is running
            startProgramBtn.disabled = true;
            terminateProgramBtn.disabled = false;
            roller.classList.add('lds-roller');
            runMsg.innerHTML = 'Running';
            try // Try to execute the program and sets a callback for when the program terminates
            {
                const { execFile } = require('child_process');
                subProcess = execFile(exePath, exeCommandArgs, options, function (err, data) {
                    if (err !== null && !subProcess.killed) {
                        ipcRenderer.send('open-errorEXE-dialog');
                    } else if (killedDueToError) {
                        ipcRenderer.send('open-errorKilled-dialog')
                    } else {
                        ipcRenderer.send('open-successfulTermination-dialog');
                    }
                    killedDueToError = false;
                    subProcess = null;
                    stdoutput = '';
                    startProgramBtn.disabled = exePath === '';
                    terminateProgramBtn.disabled = true;
                    roller.classList.remove('lds-roller');
                    runMsg.innerHTML = '';
                });
                // Standard output callback
                subProcess.stdout.on('data', function (data) {
                    stdoutput += data.toString();
                    outArea.innerHTML = `${stdoutput}`;
                });
                // Standard error callback
                subProcess.stderr.on('data', function (data) {
                    stdoutput += data.toString();
                    outArea.innerHTML = `${stdoutput}`;
                    subProcess.kill();
                    killedDueToError = true;
                });
            }
            catch (err) // Catches the error if the file selected can't be executed correctly
            {
                subProcess = null;
                startProgramBtn.disabled = exePath === '';
                terminateProgramBtn.disabled = true;
                roller.classList.remove('lds-roller');
                runMsg.innerHTML = '';
                ipcRenderer.send('open-error-dialog');
                outArea.innerHTML = `${err.toString()}`;
            }
        }
    } else {
        // Sends a warning no file path is selected
        ipcRenderer.send('open-warning-dialog');
    }
});

////////////////////////////////////////////////////////////////////////////////////
//                               Terminate Program                                //
////////////////////////////////////////////////////////////////////////////////////
// Sets terminate program button callback
terminateProgramBtn.addEventListener('click', (event) => {
    if (subProcess !== null) {
        subProcess.kill();
    } else {
        ipcRenderer.send('open-successfulTermination-dialog');
    }
});