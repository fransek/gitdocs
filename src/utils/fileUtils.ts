import { open } from '@tauri-apps/api/dialog'
import { homeDir } from '@tauri-apps/api/path'

export const openWorkspace = async () =>
  await open({
    directory: true,
    multiple: false,
    defaultPath: await homeDir(),
  })
