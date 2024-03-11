'use client'

import { files$, openDirectories$, workspacePath$ } from '@/store/store'
import { getFiles, openWorkspace } from '@/utils/fileUtils'
import { FileEntry } from '@tauri-apps/api/fs'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const Explorer = () => {
  const [workspacePath, setWorkspacePath] = useAtom(workspacePath$)
  const [files, setFiles] = useAtom(files$)
  const [openDirectories, setOpenDirectories] = useAtom(openDirectories$)

  useEffect(() => {
    const updateWorkspace = async () => {
      if (workspacePath) {
        setFiles([])
        const workspaceFiles = await getFiles(workspacePath)
        setFiles(workspaceFiles)
      }
    }
    updateWorkspace()
  }, [setFiles, workspacePath])

  const handleOpenWorkspace = async () => {
    const selected = await openWorkspace()
    setWorkspacePath(selected)
  }

  const handleOpenFile = (path: string) => {
    console.log(`open file: ${path}`)
  }

  const mapFiles = (files: FileEntry[]): React.ReactNode =>
    files.map((file) => {
      if (file.children && file.children?.length > 0) {
        if (openDirectories.includes(file.path)) {
          return (
            <>
              <li
                className='cursor-pointer hover:text-green-500 text-green-300'
                key={file.path}
                onClick={() =>
                  setOpenDirectories(
                    openDirectories.filter((dir) => dir !== file.path)
                  )
                }
              >
                {file.name}
              </li>
              <ul className='ml-3'>{mapFiles(file.children)}</ul>
            </>
          )
        }
        return (
          <li
            className='cursor-pointer hover:text-green-500 text-green-300'
            key={file.path}
            onClick={() => setOpenDirectories([...openDirectories, file.path])}
          >
            {file.name}
          </li>
        )
      }
      return (
        <li
          className='cursor-pointer hover:text-gray-300'
          key={file.path}
          onClick={() => handleOpenFile(file.path)}
        >
          {file.name}
        </li>
      )
    })

  return (
    <div className='bg-gray-900 border-gray-800 border-[1px] w-96 p-2 overflow-y-scroll'>
      <button onClick={handleOpenWorkspace}>
        {workspacePath ?? 'Open workspace'}
      </button>
      <hr />
      <ul>{mapFiles(files)}</ul>
    </div>
  )
}
