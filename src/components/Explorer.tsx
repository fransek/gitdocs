'use client'

import { workspace$ } from '@/store/store'
import { openWorkspace } from '@/utils/fileUtils'
import { useAtom } from 'jotai'

export const Explorer = () => {
  const [workspace, setWorkspace] = useAtom(workspace$)

  const handleOpenWorkspace = async () => {
    const selectedWorkspace = await openWorkspace()
    setWorkspace(selectedWorkspace)
  }
  return (
    <div className='bg-gray-900 border-gray-800 border-[1px] w-96'>
      {workspace ? (
        <h2>{workspace}</h2>
      ) : (
        <button onClick={handleOpenWorkspace}>Open workspace</button>
      )}
    </div>
  )
}
