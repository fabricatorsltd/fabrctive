const { invoke } = window.__TAURI__.tauri;
const { appWindow } = window.__TAURI__.window;

document
  .getElementById("titlebar-minimize")
  .addEventListener("click", () => appWindow.minimize());
document
  .getElementById("titlebar-maximize")
  .addEventListener("click", () => appWindow.toggleMaximize());
document
  .getElementById("titlebar-close")
  .addEventListener("click", () => appWindow.close());

console.log("Hello from Tauri!");
