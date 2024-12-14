use my_tray::setup_tray_pop;
use windows::{main_win::setup_win, tray_win::setup_tray_win};

pub mod my_tray;
pub mod windows;
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app: &mut tauri::App| {
            // setup_tray_menu(app)?;
            setup_tray_pop(app)?;
            setup_tray_win(app)?;
            setup_win(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
