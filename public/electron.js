const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1466,
    height: 868,
    alwaysOnTop: true,
    titleBarStyle: "hidden",
    icon: '../build/icon.icns',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(isDev ? "http://localhost:3000" : "https://fronza-transportes.now.sh");


  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
