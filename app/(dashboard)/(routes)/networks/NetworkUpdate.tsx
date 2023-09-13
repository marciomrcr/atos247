'use client'

import axios from 'axios'
import { Edit, Save, XOctagon } from 'lucide-react'
import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

export const metadata: Metadata = {
  title: 'Redes de Células - Jetro' 
}

interface IFormProps {  
  network: {
    id: string , 
    name: string,
  }
}

export default function NetworkUpdate(  {network}: IFormProps
) {  
const router = useRouter()
  const [name, setName] = useState(network.name)
  

  const [isOpen, setIsOpen] = useState(false)

  const handleUpdate = async (e: SyntheticEvent) =>{
    e.preventDefault()
    await axios.patch(`api/networks/${network.id}`, {
    name: name,   
    })
    
    router.refresh()
    setIsOpen(false)
  }
  
  const handleModal = () =>{
    setIsOpen(!isOpen)
    
  }
  return (
    <div >
      < Edit className='' onClick={handleModal} />
      
      <div className={
        isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box mb-72'>
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {network.name} </h1>
                
      <form onSubmit={handleUpdate} >
        <input type="text"
        required
        autoComplete='off'        
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}       
        className="mb-3 w-full input input-bordered"
        />
        
        <div className='modal-action'>   
        <div onClick={handleModal} className="cursor-pointer flex items-center">
         <XOctagon  className=" text-red-600" />
          <span className=" text-red-600 px-2">Cancelar</span></div>
          
          <button type='submit'          
          className="flex items-center">
            <span className='px-2 text-blue-600'><Save  className="text-blue-500 cursor-pointer" /></span>Atualizar
            </button>          
          
        </div>
      </form>
      </div>

      </div>
    </div>
  )
}



