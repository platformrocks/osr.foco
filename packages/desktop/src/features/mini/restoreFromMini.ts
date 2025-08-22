import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { getCurrentWindow } from '@tauri-apps/api/window';

export const restoreFromMini = async (): Promise<void> => {
  try {
    // Get the main window and restore it
    const main = await WebviewWindow.getByLabel('main');
    if (main) {
      // Unminimize first if it was minimized
      await main.unminimize();
      // Then show and focus
      await main.show();
      await main.setFocus();
    }

    // Close the current mini window
    const currentWindow = getCurrentWindow();
    await currentWindow.close();
  } catch (error) {
    console.error('Failed to restore from mini window:', error);
  }
};
