"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: "Redes de Células - Jetro",
};

const formSchema = z.object({
  name: z.string().nonempty('O nome não pode ficar em branco!')
  .min(3, "O Nome deverá ter pelo menos 3 letras."),
});

type Network = z.infer<typeof formSchema>;

export default function NetworkForm() {
  const {handleSubmit, register, reset, setFocus, formState: {errors}} = useForm<Network>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    criteriaMode: 'all'

  })
  const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {     
    setIsOpen(!isOpen); 
    reset()   
    
  };
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data: Network ) => {
  const response = await fetch("http://localhost:3000/api/networks", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})
if (!response.ok) {
  toast.error("Falha ao cadastrar a rede!", {
    position: toast.POSITION.TOP_CENTER,
  });
}
toast.success("Rede cadastrada com sucesso!", {
  position: toast.POSITION.TOP_CENTER,
});
setLoading(false);
refresh()
handleModal()  } 

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add Rede de Células
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-2 text-lg text-center font-bold">
            Cadastrar nova Rede
          </h1>
        
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
      <div>
      <label className="text-gray-200 mt-2">Nome da Rede</label>
      <input placeholder="Nome da rede" type="text"
      autoComplete="off"
      className="mb-3 w-full input input-bordered"
      {...register('name')} />         
    {errors.name && (<p className="text-black">{errors.name.message}</p>)}  </div> 
       <div className="modal-action">
        <button type="button" onClick={handleModal} className="btn bg-red-500 mb-3 ">Cancelar</button>
        <button type="submit" className="btn btn-primary">Salvar</button></div>
      </form>
        </div>
      </div>
    </div>
  );
}
