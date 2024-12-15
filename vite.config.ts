import { defineConfig } from "vite";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
const host = process.env.TAURI_DEV_HOST;

const nextuiComponents = [
  "Accordion",
  "AccordionItem",
  "Alert",
  "Avatar",
  "Badge",
  "BreadcrumbItem",
  "Breadcrumbs",
  "Button",
  "Calendar",
  "Card",
  "CardBody",
  "CardFooter",
  "CardHeader",
  "Checkbox",
  "CheckboxGroup",
  "CircularProgress",
  "Code",
  "DatePicker",
  "DateRangePicker",
  "Divider",
  "Drawer",
  "DrawerBody",
  "DrawerContent",
  "DrawerFooter",
  "DrawerHeader",
  "Dropdown",
  "DropdownItem",
  "DropdownMenu",
  "DropdownTrigger",
  "Image",
  "Link",
  "Input",
  "useDisclosure",
  "InputOtp",
  "Kbd",
  "Modal",
  "ModalContent",
  "ModalBody",
  "ModalHeader",
  "ModalFooter",
  "Pagination",
  "Popover",
  "PopoverContent",
  "PopoverTrigger",
  "Progress",
  "RadioGroup",
  "Radio",
  "Skeleton",
  "Slider",
  "Snippet",
  "Spacer",
  "Spinner",
  "Switch",
  "Table",
  "TableRow",
  "TableBody",
  "TableCell",
  "TableHeader",
  "TableColumn",
  "Tabs",
  "Tab",
  "TimeInput",
  "Tooltip",
  "User",
];

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    reactRouter(),
    AutoImport({
      dts: "./src/types/auto-import.d.ts",
      imports: [
        "react",
        {
          "@nextui-org/react": nextuiComponents,
        },
      ],
    }),
  ],
  build: {
    cssCodeSplit: true, // 确保 CSS 被分离出来
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
