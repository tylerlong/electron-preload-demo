import { contextBridge, ipcRenderer } from 'electron';
import CONSTS from './constants';

contextBridge.exposeInMainWorld('electronAPI', {
  hello: (name: string) => ipcRenderer.invoke(CONSTS.HELLO_TO_MAIN, name),
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
