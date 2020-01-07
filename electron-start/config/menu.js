const { Menu, BrowserWindow, shell } = require('electron')
const path = require('path')
const url = require('url')

let menu = [
    {
        label: "查看",
        submenu: [
            {
                label: "横屏",
                type: "radio",
                checked: false,
                click: ()=>{
                    const win = BrowserWindow.fromId(1)
                    // win.setSize(600, 400)
                    win.setBounds({ width: 600, height: 400 })
                    // console.log(win.getMinimumSize())
                    win.webContents.send('change-size', 'heng')
                }
            },
            {
                label: "竖屏",
                type: "radio",
                checked: true,
                click: ()=>{
                    const win = BrowserWindow.fromId(1)
                    // win.setSize(400, 600)
                    win.setBounds({ width: 400, height: 600 })
                    win.webContents.send('change-size', 'shu')
                }
            },
            { type: "separator" },
            {
                label: "开发者工具",
                role: "toggleDevTools"
            },
            {
                label: "重载",
                role: "reload"
            },
            {
                label: "退出",
                role: "quit"
            }
        ]
    },
    {
        label: "帮助",
        submenu: [
            {
                label: "问题反馈",
                click: ()=>{
                    shell.openExternal('https://www.baidu.com')
                }
            },
            { type: "separator" },
            {
                label: "关于我们",
                click: ()=>{
                    const win = BrowserWindow.fromId(1)
                    const about = new BrowserWindow({
                        parent: win,
                        modal: true,
                        width: 500,
                        height: 300,
                        resizable: false,
                        minimizable: false,
                        title: "关于我们",
                        webPreferences: {
                            nodeIntegration: true
                        }
                    })
                    about.loadURL(url.format({
                        pathname: path.join(__dirname, '../src/about.html'),
                        protocol: "file",
                        slashes: true
                    }))
                    // about.webContents.openDevTools()
                    about.setMenu(null)
                    about.once('ready-to-show', () => {
                        about.show()
                    })
                }
            }
        ]
    }
]

menu = Menu.buildFromTemplate(menu)
Menu.setApplicationMenu(menu)