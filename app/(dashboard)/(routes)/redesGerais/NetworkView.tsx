'use client'
import { View } from 'lucide-react';
import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "Redes de Células - Atos 2.47",
};


interface IFormProps {
  network: {
    id: string;
    name: string;
  };
}

export default function NetworkView({ network }: IFormProps) {
  interface ICell {
   cell: { id: string
    name: string
    email: string
    cell: string
    network: string
    _count: number}[]

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
          <h1 className="mb-2 text-lg text-center font-bold">Rede {network.name}</h1>
                   
         
        </div>
      </div>
    </div>
  );
}
