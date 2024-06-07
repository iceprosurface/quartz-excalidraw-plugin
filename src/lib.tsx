import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { render } from 'preact';
import LZString from 'lz-string';
type ExcalidrawProps = {
  width?: string,
  height?: string
}
function App(props: {
  element: readonly ExcalidrawElement[] | null,

} & ExcalidrawProps) {
  return <div style={{ width: props.width, height: props.height }}>
    <Excalidraw
      initialData={{
        elements: props.element,
        scrollToContent: true
      }}
      viewModeEnabled={true}
    >
    </Excalidraw>
  </div>
}

export function mountApp(element: HTMLElement, initialData: readonly ExcalidrawElement[] | null, options: ExcalidrawProps) {
  console.log(initialData)
  render(<App element={initialData} {...options} />, element);
}
export const decompress = (data: string,): string => {
  return LZString.decompressFromBase64(data.replaceAll("\n", "").replaceAll("\r", ""));
};

export function decodeData(data: string): ExcalidrawElement[] {
  const parts = data.split("\n# Drawing\n```compressed-json\n");
  if (parts.length !== 2) return []
  const compressed = parts[1].split("\n```\n%%");
  if (compressed.length !== 2) return []
  const decompressed = decompress(compressed[0]);
  if (!decompressed) {
    return []
  }
  return JSON.parse(decompressed)?.elements ?? [];
}