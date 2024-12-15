import { Menu } from "@tauri-apps/api/menu";
import { getAllWindows } from "@tauri-apps/api/window";
import { getName } from "@tauri-apps/api/app";
import i18next from "@/i18";

import { TFunction } from "i18next";

export const getWebviewWindowByTitle = async (title: string) => {
  const windows = await getAllWindows();
  return windows.find((w) => w.label === title);
};

export const setupMenu = async (_t: TFunction<"menu", undefined>) => {
  const appName = await getName();

  console.log(i18next);

  const menu = await Menu.new({
    id: "main",
    items: [
      {
        id: "1",
        text: appName,
        items: [
          {
            id: "1-1",
            text: i18next.t("menu.about", { appName }),
          },
          {
            id: "1-2",
            text: i18next.t("menu.update"),
          },
          {
            item: "Separator",
          },
          {
            text: i18next.t("language"),
            item: "Services",
          },
          {
            item: "Separator",
          },
          {
            text: "隐藏" + appName,
            item: "Hide",
          },
          {
            text: "隐藏其他",
            item: "HideOthers",
          },
          {
            text: "显示全部",
            item: "ShowAll",
          },

          {
            item: "Separator",
          },
          {
            text: "退出" + appName,
            item: "CloseWindow",
          },
        ],
      },
    ],
  });

  await menu.setAsAppMenu();
};
