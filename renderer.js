// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron')
const {execFile} = require('child_process')

const closeAppBtn = document.getElementById('CloseAppBtn')
const selectProgramBtn = document.getElementById('SelectProgramBtn')
const startProgramBtn = document.getElementById('StartProgramBtn')
const terminateProgramBtn = document.getElementById('TerminateProgramBtn')
let exePath = ''
let exeCommandArgs = [''];
let subProcess = null

closeAppBtn.addEventListener('click', (event)=>
{
    ipcRenderer.send('close-app')
})

////////////////////////////////////////////////////////////////////////////////////
//                               Select Program                                   //
////////////////////////////////////////////////////////////////////////////////////
// Sets select program button callback
selectProgramBtn.addEventListener('click', (event)=>
{
    console.log('Select Button clicked!')
    ipcRenderer.send('open-file-dialog')
})
// Sets the executable filepath received from the main process (main.js)
ipcRenderer.on('SelectedFile', (event, path)=>
{
    document.getElementById('FilePath').innerHTML = `${path.toString()}`
    exePath = path.toString()
})

////////////////////////////////////////////////////////////////////////////////////
//                                Start Program                                   //
////////////////////////////////////////////////////////////////////////////////////
// Sets start program button callback
startProgramBtn.addEventListener('click', (event)=>
{
    console.log('Start Button clicked!')
    if(exePath!=='')
    {
        if(subProcess!==null) // Check if a subprocess is already running
        {
            ipcRenderer.send('open-isRunning-dialog')
        }else
        {
            // Clear output data field
            document.getElementById('OutputData').innerHTML = ''
            try // Try to execute the program and sets a callback for when the program terminates
            {
                subProcess = execFile(exePath, exeCommandArgs, function(err, data)
                {
                    if(err!==null && !subProcess.killed)
                    {
                        ipcRenderer.send('open-errorEXE-dialog')
                    }else
                    {
                        ipcRenderer.send('open-successfulTermination-dialog')
                    }
                    console.log(err)
                    console.log(data.toString())
                    // sets the output data and replacing \n with <br/> performs a global replacement with /\n/g
                    document.getElementById('OutputData').innerHTML = `${data.toString().replace(/\n/g,'<br/>')}`
                    subProcess = null
                })
            }
            catch(err) // Catches the error if the file selected can't be executed correctly
            {
                subProcess = null
                console.log(err)
                ipcRenderer.send('open-error-dialog')
                // sets the output data and replacing \n with <br/> performs a global replacement with /\n/g
                document.getElementById('OutputData').innerHTML = `${err.toString().replace(/\n/g,'<br/>')} <br/>`
            }
        }
    }else
    {
        // Sends a warning no file path is selected
        console.log('Please select an executable file first!')
        ipcRenderer.send('open-warning-dialog')
    }
})

////////////////////////////////////////////////////////////////////////////////////
//                               Terminate Program                                //
////////////////////////////////////////////////////////////////////////////////////
// Sets terminate program button callback
terminateProgramBtn.addEventListener('click', (event)=>
{
    if(subProcess!==null)
    {
        subProcess.kill()
    }else
    {
        ipcRenderer.send('open-successfulTermination-dialog')
    }
})