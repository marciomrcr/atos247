'use client'

import axios from 'axios'
import { Trash2, XOctagon } from 'lucide-react'
import type { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Redes de Células - Jetro'
}

type Network = {
  id: string , 
  name?: string,
  
}

export default function NetworkDelete({id, name}: Network
) {  
const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async (id: string) =>{
        await axios.delete(`api/redesGerais/${id}`)
        router.refresh()
    setIsOpen(false)
  }
  
  const handleModal = () =>{
    setIsOpen(!isOpen)
    
  }
  return (
    <div>
      <Trash2 onClick={handleModal} className="cursor-pointer"   
          />
      {/* <button className='btn btn-error btn-sm' onClick={handleModal}>Excluir</button> */}
      <div className={
        isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className="mb-2 text-lg text-center font-bold text-red-500">Deseja realmente excluir a rede {name}?</h3>     
    
      <div className='modal-action'>   
      <div onClick={handleModal} className="cursor-pointer flex items-center">
                <XOctagon className="text-red-600" />
                <span className="text-red-600 px-2">Cancelar</span>
              </div>

              <div onClick={()=>handleDelete(id)}  className="cursor-pointer flex items-center">
              <Trash2           
          /><span className="text-red-600 px-2">Excluir</span>
              </div>


          
          
        </div>
      </div>

      </div>
    </div>
  )
}



