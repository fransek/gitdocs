import { open } from '@tauri-apps/api/dialog'
import { BaseDirectory, readDir } from '@tauri-apps/api/fs'
import { homeDir } from '@tauri-apps/api/path'

export const openWorkspace = async () =>
  (await open({
    directory: true,
    multiple: false,
    defaultPath: await homeDir(),
  })) as string | null

export const getFiles = async (
  path: string,
  options: { dir?: BaseDirectory; recursive?: true } = { recursive: true }
) => await readDir(path, options)
