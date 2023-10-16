const { ipcRenderer } = window.require("electron");

interface Props {
  path: string;
}
export function OpenApp({ path }: Props) {
  console.log(path);
  ipcRenderer.send("AppPath", { path });
}
