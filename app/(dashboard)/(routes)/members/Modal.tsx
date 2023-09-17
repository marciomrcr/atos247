

import type { Metadata } from "next";
import React, { Dispatch, SetStateAction } from "react";
interface IModal{
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Membros - Atos 2.47",
};



export default function Modal({children, modalOpen, setModalOpen}:IModal ) {

 
  return (
    <>
    {modalOpen && (
      <div className="bg-black/50 fixed inset-0">
        <div className="flex md:mr-8 md:justify-end justify-center items-center h-full">
          <div className="flex flex-col items-center bg-slate-300 w-11/12 md:w-9/12 p-5 ">
            {/* ### Fechar modal ### */}
            <button 
            onClick={()=> setModalOpen(false)} className="text-2xl mb-3 ">&times;</button>
            {/* Aqui serão renderizado os componentes na tela */}
            {children}
           
          </div>
        </div>
      </div>
    )}
    
    </>
  )
}
