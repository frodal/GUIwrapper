// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {ipcRenderer} = require('electron')
const {execFile} = require('child_process')

const startProgramBtn = document.getElementById('StartProgramBtn')
let exePath = ''
let exeCommandArgs = [''];
let isRunning = false

startProgramBtn.addEventListener('click', (event)=>
{
    console.log('Start Button clicked!')
    if(exePath!=='')
    {
        if(isRunning)
        {
            ipcRenderer.send('open-isRunning-dialog')
        }else
        {
            document.getElementById('OutputData').innerHTML = ''
            isRunning = true
            try
            {
                execFile(exePath, exeCommandArgs, function(err, data)
                {
                    isRunning = false
                    console.log(err)
                    console.log(data.toString())
                    // sets the output data and replacing \n with <br/> performs a global replacement with /\n/g
                    document.getElementById('OutputData').innerHTML = `${data.toString().replace(/\n/g,'<br/>')}`
                })
            }
            catch(err)
            {
                isRunning = false
                console.log(err)
                ipcRenderer.send('open-error-dialog')
                document.getElementById('OutputData').innerHTML = `${err.toString().replace(/\n/g,'<br/>')} <br/>`
            }
        }
    }else
    {
        console.log('Please select an executable file first!')
        ipcRenderer.send('open-warning-dialog')
    }
})

const selectProgramBtn = document.getElementById('SelectProgramBtn')

selectProgramBtn.addEventListener('click', (event)=>
{
    console.log('Select Button clicked!')
    ipcRenderer.send('open-file-dialog')
})
ipcRenderer.on('SelectedFile', (event, path)=>
{
    document.getElementById('FilePath').innerHTML = `${path.toString()}`
    exePath = path.toString()
})