// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use window_shadows::set_shadow;

fn main() {
	tauri::Builder::default()
		.setup(|app| {
			let window = app.get_window("main").unwrap();
			set_shadow(&window, true).expect("Unsupported platform!");
			window.center().expect("Can't center window.");
			Ok(())
		})
		.plugin(tauri_plugin_store::Builder::default().build())
		.system_tray(create_system_tray())
		.on_system_tray_event(|app, event| tray_event_handler(app, event))
		.invoke_handler(tauri::generate_handler![show_window])
		.build(tauri::generate_context!())
		.expect("Error while building tauri application.")
		.run(|_app_handle, event| match event {
			tauri::RunEvent::ExitRequested { api, .. } => {
				api.prevent_exit();
			}
			_ => {}
		});
}

fn create_system_tray() -> SystemTray {
	let show_window = CustomMenuItem::new("show_window".to_string(), "Show Window");
	let quit = CustomMenuItem::new("quit".to_string(), "Quit");
	let tray_menu = SystemTrayMenu::new()
		.add_item(show_window)
		.add_native_item(SystemTrayMenuItem::Separator)
  		.add_item(quit);
	let tray = SystemTray::new().with_menu(tray_menu);

	return tray;
}

fn tray_event_handler(app_handle: &tauri::AppHandle, event: SystemTrayEvent) {
	match event {
		SystemTrayEvent::LeftClick {
				position: _,
				size: _,
				..
			} => {
				show_window_helper(app_handle);
			}
		SystemTrayEvent::DoubleClick {
				position: _,
				size: _,
				..
			} => {
				show_window_helper(app_handle);
			}
		SystemTrayEvent::MenuItemClick { id, .. } => {
			match id.as_str() {
				"show_window" => {
					show_window_helper(app_handle);
				}
				"quit" => {
					std::process::exit(0);
				}
				_ => {}
			}
		}
		_ => {}
	}
}

#[tauri::command]
async fn show_window(app_handle: tauri::AppHandle) {
	show_window_helper(&app_handle);
}

fn show_window_helper(app_handle: &tauri::AppHandle) {
	let window = app_handle.get_window("main").unwrap();
	window.show().expect("Cannot show window.");
	window.set_focus().expect("Set focus failed.");
}
