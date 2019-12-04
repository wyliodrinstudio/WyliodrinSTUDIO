const app = require ('electron').app;
const dialog = require ('electron').dialog;
const BrowserWindow = require ('electron').BrowserWindow;
const ipcMain = require ('electron').ipcMain;
const path = require ('path');
const isDev = require ('electron-is-dev');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
function sendStatusToWindow(text) {
	log.info(text);
	win.webContents.send('message', text);
}

autoUpdater.on('update-downloaded', (ev, releaseNotes, releaseName) => {
	sendStatusToWindow('Update downloaded; will install in 5 seconds');
	const dialogOpts = {
		type: 'info',
		buttons: ['Restart', 'Later'],
		title: 'Application Update',
		message: process.platform === 'win32' ? releaseNotes : releaseName,
		detail: 'A new version has been downloaded. Restart the application to apply the updates.'
	};
	
	dialog.showMessageBox(dialogOpts).then((returnValue) => {
		if (returnValue.response === 0) autoUpdater.quitAndInstall();
		win.webContents.send('updated');
	});
	
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

var loading = true;

let closing = false;

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({ width: 1180,
		height: 800,
		minWidth: 1150,
		frame: false,
		title: 'Wyliodrin STUDIO',
		icon: path.join (__dirname, '/img/icons/linux/64x64.png'),
		minHeight: 700, 
		webPreferences: {
			nodeIntegration: true,
			webSecurity: true,
			allowRunningInsecureContent: false
		}
	});

	// and load the index.html of the app.
	win.loadFile('./index.html');

	// Open the DevTools.
	if (isDev)
	{
		// require('vue-devtools').install();
		win.webContents.openDevTools();
	}

	win.on('close', function(e){
		if (!loading && !closing)
		{
			win.webContents.send('close-ask');
			e.preventDefault ();
		}
	});
	

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null;
	});

	ipcMain.on ('loaded', () => {
		loading = false;
	});

	ipcMain.on ('close', () => {
		closing = true;
		win.close ();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	
	createWindow();
	autoUpdater.checkForUpdates();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	// if (process.platform !== 'darwin') {
	// 	app.quit();
	// }
	app.quit ();
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});


