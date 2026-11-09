const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getSettings: () => ipcRenderer.invoke("getSettings"),
  saveSettings: (s) => ipcRenderer.invoke("saveSettings", s),
  getStatus: () => ipcRenderer.invoke("getStatus"),
  saveSample: (s) => ipcRenderer.invoke("saveSample", s),
  dropSample: () => ipcRenderer.invoke("dropSample"),
  getMirror: () => ipcRenderer.invoke("getMirror"),
  testAlarm: () => ipcRenderer.invoke("testAlarm"),
  exportSamples: () => ipcRenderer.invoke("exportSamples"),
  onAlarm: (fn) => ipcRenderer.on("alarm", (_e, a) => fn(a)),
});
