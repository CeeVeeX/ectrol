import { Electrol } from 'electrol'
import { app, BrowserWindow } from 'electron/main'

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
    },
  })

  win.loadFile('index.html')

  win.webContents.openDevTools()

  const electrol = new Electrol(win.webContents)

  win.webContents.on('did-finish-load', async () => {
    await electrol.localStorage.setItem('greeting', 'Hello, localStorage!')
    await electrol.sessionStorage.setItem('greeting', 'Hello, sessionStorage!')

    console.warn(await electrol.localStorage.getItem('greeting'))
    console.warn(await electrol.sessionStorage.getItem('greeting'))

    console.log(await electrol.$('#info').getBoundingClientRect())

    const btn1 = electrol.$('#btn')
    const btn2 = electrol.$('#btn2')
    const inputBox = electrol.$('#inputBox')
    const textArea = electrol.$('#textArea')
    const checkbox1 = electrol.$('#checkbox1')
    const radio2 = electrol.$('#radio2')

    await new Promise(resolve => setTimeout(resolve, 5000))

    await btn1.click()
    await btn2.click()

    await new Promise(resolve => setTimeout(resolve, 3000))
    await btn1.hover()
    await btn2.hover()

    await inputBox.fill('Hello, World!')
    await textArea.fill('This is a text area.\n多行文本测试。')
    await checkbox1.check()
    await radio2.check()

    /** ------------------------------------------------------------------------------------------------- */

    const iframe_btn1 = electrol.$('iframe|>button#btn')
    const iframe_btn2 = electrol.$('iframe|>button#btn2')
    const iframe_inputBox = electrol.$('iframe|>input#inputBox')
    const iframe_textArea = electrol.$('iframe|>textarea#textArea')
    const iframe_checkbox1 = electrol.$('iframe|>input#checkbox1')
    const iframe_radio2 = electrol.$('iframe|>input#radio2')

    await new Promise(resolve => setTimeout(resolve, 3000))
    await iframe_btn1.click()
    await iframe_btn2.click()

    await new Promise(resolve => setTimeout(resolve, 3000))
    await iframe_btn1.hover()
    await iframe_btn2.hover()

    await iframe_inputBox.fill('Hello, World!')
    await iframe_textArea.fill('This is a text area.\n多行文本测试。')
    await iframe_checkbox1.check()
    await iframe_radio2.check()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
