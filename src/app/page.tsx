import { Editor } from '@/components/Editor'
import { Explorer } from '@/components/Explorer'

export default function Home() {
  return (
    <div className='flex w-full h-screen'>
      <Explorer />
      <Editor />
    </div>
  )
}
