use std::process::Command;
use std::env;
use std::path::PathBuf;

#[tauri::command]
fn run_bot() -> String {
    let cwd: PathBuf = env::current_dir().unwrap();

    let project_root;
    if cwd.to_string_lossy().ends_with("src-tauri") {
        project_root = cwd.parent().unwrap_or(&cwd).to_path_buf();
    } else {
        project_root = cwd.clone();
    }
    
    let bot_path = project_root.join("src/lib/bot.ts");

    std::thread::spawn(move || {
        Command::new("node")
            .arg("--loader")
            .arg("ts-node/esm")
            .arg(bot_path.to_str().unwrap().to_string())
            .current_dir(&project_root)
            .spawn()
            .ok();
    });
    
    "Dub fr.".to_string()
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
