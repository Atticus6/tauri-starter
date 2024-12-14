import { getAllWindows } from "@tauri-apps/api/window";

export const getWebviewWindowByTitle = async (title: string) => {
  const windows = await getAllWindows();
  return windows.find((w) => w.label === title);
};
