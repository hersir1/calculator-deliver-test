const { app, BrowserWindow, Menu } = require('electron')
const url = require('url');
const path = require('path');

let win;

function createWindow () {
	win = new BrowserWindow({
		width: 466,
		height: 429,
		webPreferences: {
			nodeIntegration: true
		}
	})
	
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, '/dist/calculator-deliver-test/index.html'),
			protocol: "file:",
			slashes: false
		})
	);
	
	/*win.webContents.openDevTools()*/
	/*win.setMaximumSize(450, 384);
	win.setMinimumSize(450, 384);*/
	Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', async () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
