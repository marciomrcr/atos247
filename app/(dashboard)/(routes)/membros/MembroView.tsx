'use client'
import { View, XOctagon } from 'lucide-react';
import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "Redes de Células - Atos 2.47",
};


interface IFormProps {
  membro: {
    id: string;
    name: string;
  };
}

export default function MembroView({ membro }: IFormProps) {
  interface ICell {
    membro: { id: string
    name: string
    }[]

  } 
  const [isOpen, setIsOpen] = useState(false)


 

  const handleModal = () => {
    setIsOpen(!isOpen)
    
  };

  return (
    <div>
      <View className="cursor-pointer" onClick={handleModal} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
        <span><XOctagon onClick={handleModal}  className="text-black " /></span>
          <h1 className="mb-2 text-lg text-center font-bold">{membro.name}</h1>
         
        </div>
      </div>
    </div>
  );
}
