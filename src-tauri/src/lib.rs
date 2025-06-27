#[tauri::command]
fn run_bot() -> String {
    use std::process::Command;
    use std::env;
    use std::path::PathBuf;

    let cwd = env::current_dir().unwrap_or_else(|_| PathBuf::from("(unknown)"));
    let project_root = if cwd.ends_with("src-tauri") {
        cwd.parent().unwrap_or(&cwd).to_path_buf()
    } else {
        cwd.clone()
    };
    let bot_path = project_root.join("src/lib/bot.ts");

    Command::new("node")
        .arg("--loader")
        .arg("ts-node/esm")
        .arg(bot_path.to_str().unwrap())
        .output()
        .ok();
    "Bot started and finished.".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            run_bot,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
