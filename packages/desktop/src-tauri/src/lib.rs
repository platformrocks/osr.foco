use tauri::{AppHandle, Manager};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn minimize_window(app: AppHandle) -> Result<(), String> {
    match app.get_webview_window("main") {
        Some(window) => {
            window.minimize().map_err(|e| e.to_string())?;
            Ok(())
        }
        None => Err("Main window not found".to_string()),
    }
}

#[tauri::command]
async fn close_window(app: AppHandle) -> Result<(), String> {
    match app.get_webview_window("main") {
        Some(window) => {
            window.close().map_err(|e| e.to_string())?;
            Ok(())
        }
        None => Err("Main window not found".to_string()),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, minimize_window, close_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
