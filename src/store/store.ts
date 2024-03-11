import { FileEntry } from '@tauri-apps/api/fs'
import { atom } from 'jotai'

export const workspacePath$ = atom<string | null>(
  'C:\\Users\\frans\\OneDrive\\Documents\\Blender'
)
export const files$ = atom<FileEntry[]>([])

export const openDirectories$ = atom<string[]>([])
