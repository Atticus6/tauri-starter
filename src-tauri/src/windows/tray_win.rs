use tauri::Listener;
use tauri::Manager;

pub fn setup_tray_win(app: &mut tauri::App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let tray_label = "tray";

    // 检查是否已存在名为 "tray" 的窗口
    if app.get_window(tray_label).is_some() {
        log::info!("Tray window已经存在");
        return Ok(());
    }

    // 创建新的窗口
    let tray_window = tauri::webview::WebviewWindowBuilder::new(
        app,
        "tray",
        tauri::WebviewUrl::App("/tray".into()),
    )
    .inner_size(300.0, 100.0) // 设置窗口尺寸
    .decorations(false)
    .visible(false)
    .build();

    match tray_window {
        Ok(window) => {
            log::info!("Tray window创建成功");

            // 添加事件监听器
            // let app_handle = app.app_handle().clone();
            window.once("tauri://created", move |_| {
                println!("Tray window创建成功事件");
            });

            // 添加事件监听器：窗口失去焦点事件
            let window_clone = window.clone(); // 克隆一次即可
            window.on_window_event(move |event| {
                use tauri::WindowEvent;
                if let WindowEvent::Focused(false) = event {
                    // 隐藏窗口
                    window_clone
                        .hide()
                        .expect("Failed to hide window tray_window");
                }
            });

            window.once("tauri://error", move |e| {
                log::error!("Error occurred during tray window creation: {:?}", e);
            });
        }
        Err(e) => {
            log::error!("Failed to create tray window: {:?}", e)
        }
    }

    Ok(())
}
