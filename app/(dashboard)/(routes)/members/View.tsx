'use client'

import { ViewIcon } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation'; // Corrigir import
import { useState } from 'react';

export const metadata: Metadata = {
  title: "Células - Atos 2.47",
};


interface IMemberForm{
  member: {
    id: string,
    name: string,
    email: string,
    cellId: string
  },
  cells: {
    id: string,
    name: string
  }[]
}


export default function View({cells, member }: IMemberForm) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)


  



const handleModal = () =>{
  setIsOpen(!isOpen)
  
}
  
  return (
    <div>
                              
      <ViewIcon  onClick={handleModal} className="cursor-pointer"  />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        
      <div className="bg-black/50 fixed inset-0">
        <div className="flex md:mr-8 md:justify-end justify-center items-start h-full">
          <div className="flex flex-col items-start bg-slate-300 w-11/12 md:w-9/12 p-5 mt-10 ">
<p>Nome: {member.name}</p>
<p>Email: {member.email}</p>
           
        
          <div className='modal-action'>
            <button onClick={()=>setIsOpen(false)} className='btn btn-secondary'>
            Fechar
            </button>
          </div>
        
          
        </div>
        </div>
        </div>
      
      
      
      </div>
    </div>
  );
}


