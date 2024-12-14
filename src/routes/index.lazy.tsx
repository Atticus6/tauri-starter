import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Button
        onPress={() => {
          // newWebView();
        }}
      >
        新建窗口
      </Button>

      <Button
        onPress={() => {
          // clearWindows();
        }}
      >
        1
      </Button>
    </div>
  );
}
