/// <reference types="vite/client" />
import data from "./test.excalidraw.md?raw";
import { decodeData, mountApp } from "./lib";

mountApp(document.getElementById("app")!, decodeData(data), {
  width: "100%",
  height: "100%"
});