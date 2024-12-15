use tauri::{Manager, WindowEvent};

pub fn setup_win(app: &mut tauri::App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    // 获取主窗口
    let main_window = app.get_window("main").expect("Main window not found");
    let app_handle = app.handle().clone(); // 克隆应用句柄以避免借用冲突

    // 监听主窗口关闭事件
    main_window.on_window_event(move |event| {
        if let WindowEvent::CloseRequested { .. } = event {
            // 遍历所有窗口并关闭非主窗口
            for window in app_handle.windows().values() {
                if window.label() != "main" {
                    if let Err(e) = window.close() {
                        log::error!("Failed to close window '{}': {:?}", window.label(), e);
                    }
                }
            }
        }
    });

    // let menu_handle = main_window.menu().unwrap();
    // println!("{:?}", menu_handle);
    // menu_handle.popup(main_window).unwrap();

    // #[cfg(not(debug_assertions))]
    // {
    //     // 禁用右键菜单
    //     let main_webview = main_window.get_webview("main");
    //     if let Some(t) = main_webview {
    //         t.eval(
    //             r#"
    //     window.addEventListener('contextmenu', (e) => {
    //         e.preventDefault();
    //     });
    //     "#,
    //         )
    //         .unwrap();
    //     }
    // }

    Ok(())
}
