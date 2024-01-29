'use client'
import { View, XOctagon } from 'lucide-react';
import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "Redes de Células - Atos 2.47",
};


interface IFormProps {
  cargo: {
    id: string;
    title: string;
  };
}

export default function CargoView({ cargo }: IFormProps) {
  interface ICell {
    cargo: { id: string
    title: string
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
          <h1 className="mb-2 text-lg text-center font-bold">{cargo.title}</h1>
         
        </div>
      </div>
    </div>
  );
}
