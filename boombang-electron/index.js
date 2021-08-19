const {
  app,
  BrowserWindow,
  globalShortcut,
  session,
} = require("electron");


const path = require("path");
const serverUrl = `http://localhost/boombang-web`;


let mainWindow;
var iconpath = path.join(__dirname, "icon.ico");
var pjson = require(__dirname + "/package.json");
let pluginName;


if (require("electron-squirrel-startup")) {
  app.quit();
}

switch (process.platform) {
  case "win32":
    pluginName = "flash/pepflashplayer.dll";
    break;
  case "darwin":
    pluginName = "flash/PepperFlashPlayer.plugin";
    break;
  case "linux":
    pluginName = "flash/libpepflashplayer.so";
    break;
}
app.commandLine.appendSwitch(
  "ppapi-flash-path",
  path.join(__dirname, pluginName)
);

const createWindow = () => {

  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1019,
    height: 687,
    icon: iconpath,
    title: "BoomBang Game Launcher",
    webPreferences: {
      plugins: true,
      nodeIntegration: true,
    },
    show: false,
    frame: true,
    backgroundColor: pjson.backgroundColor,
    resizable: false,
  });

  mainWindow.loadURL(serverUrl);
  mainWindow.setMenu(null);
  mainWindow.show();

  mainWindow.webContents.on("did-finish-load", () => {});

  mainWindow.on("closed", (event) => {
    mainWindow = null;
  });

  globalShortcut.register("f5", function () {
    mainWindow.reload();
  });
  globalShortcut.register("f1", function () {
    mainWindow.show();
  });
  globalShortcut.register("f3", function () {
    mainWindow.toggleDevTools();
  });
  globalShortcut.register("f2", function () {
    session.defaultSession.clearCache();
  });
};

app.on("ready", () => {
  createWindow();
});
