import React from 'react'
import Sidebar from './Sidebar'
import Center from './Center'
import LeftSide from './LeftSide'

export default function Content () {
  return (
   <div className=' container mx-auto '>
    <div className='gap-4 grid  py-4 grid-cols-1 md:grid-cols-4 self-center justify-center '>

        <Sidebar />
        <Center/>
        <LeftSide/> 
        </div>    </div>

  )
}
