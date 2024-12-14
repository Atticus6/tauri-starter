use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Manager, Wry,
};

struct TrayItem<'a> {
    id: &'a str,
    title: &'a str,
    accelerator: Option<&'a str>, // 添加快捷键配置
}
pub fn setup_tray_menu(
    app: &mut tauri::App,
) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let tray_items = [
        &TrayItem {
            id: "quit",
            title: "退出         ",
            accelerator: Some("CmdOrCtrl+Q"), // 设置快捷键
        },
        &TrayItem {
            id: "about",
            title: "关于",
            accelerator: Some("CmdOrCtrl+I"), // 设置快捷键
        },
    ];

    let mut items: Vec<Box<dyn tauri::menu::IsMenuItem<Wry>>> = Vec::new();

    for tray_item in tray_items {
        let t = MenuItem::with_id(
            app,
            tray_item.id,
            tray_item.title,
            true,
            tray_item.accelerator,
        )?;
        items.push(Box::new(t));
    }

    let menu = Menu::with_items(app, &items.iter().map(|item| &**item).collect::<Vec<_>>())?;

    let tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .menu_on_left_click(true)
        .build(app)?;

    tray.on_tray_icon_event(|_tray, event| match event {
        TrayIconEvent::Click {
            button: MouseButton::Left,
            ..
        } => {
            println!("{:?}", event);
            println!("{:?}", event.id())
        }
        _ => {

            // println!("unhandled event {event:?}");
        }
    });

    tray.on_menu_event(|app, event| match event.id.as_ref() {
        "quit" => {
            println!("quit menu item was clicked");
            app.exit(0);
        }
        _ => {
            println!("menu item {:?} not handled", event.id);
        }
    });

    Ok(())
}

pub fn setup_tray_pop(app: &mut tauri::App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu_on_left_click(true)
        .build(app)?;
    tray.on_tray_icon_event(|_tray, event| match event {
        TrayIconEvent::Click {
            button: MouseButton::Left,
            position, // 获取鼠标点击位置
            ..
        } => {
            let tray_label = "tray"; // 托盘窗口的标识符
            if let Some(window) = _tray.app_handle().get_window(tray_label) {
                // 设置窗口位置到点击点的下方
                window
                    .set_position(tauri::PhysicalPosition {
                        x: position.x as i32 - 150,
                        y: 10, // 将窗口放在点击点正下方
                    })
                    .expect("Failed to set window position");
                // 显示窗口
                window.show().expect("Failed to show window");
                window.set_focus().expect("Failed to set_focus window");
            } else {
                log::error!("Tray window not found");
            }
        }
        _ => {

            // println!("unhandled event {event:?}");
        }
    });

    Ok(())
}
