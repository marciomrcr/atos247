"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Save, XOctagon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: "Athos 2.47 - Cargos",
};

const formSchema = z.object({
  title: z
  .string()    
  .nonempty('O nome não pode ficar em branco!')
  .min(3, "O Nome deverá ter pelo menos 3 letras.")
  .trim()
  .transform(title =>{
    return title.trim().split(' ').map(word =>{
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
});

type Cargo = z.infer<typeof formSchema>;

export default function CargoForm() {
  const {handleSubmit, register, reset, setFocus, formState: {errors}} = useForm<Cargo>({
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

  const handleSubmitForm = async (data: Cargo ) => {
   
  const response = await fetch("api/cargo", {
  method: "POST",
  body: JSON.stringify({ ...data}),
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

handleModal() 
refresh()
setLoading(true);
 } 

  return (
    <div>
      <button className="btn w-[200px]" onClick={handleModal}>
        Add Cargo
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-2 text-lg text-center font-bold">
            Novo Cargo
          </h1>
        
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
      <div>
      <label className="text-gray-200 mt-2">Nome do Cargo</label>
      <input placeholder="Nome do cargo" type="text"
      autoComplete="off"
      className="mb-3 w-full input input-bordered"
      {...register('title')} />         
    {errors.title && (<p className="text-black">{errors.title.message}</p>)}  </div> 
       <div className="modal-action">
        <button type="button" onClick={handleModal} className="btn bg-red-500 mb-3 "><span className="px-2 text-blue-600">
                  <XOctagon className="text-red-500-500 cursor-pointer" />
                </span>Cancelar</button>
        <button type="submit" className="btn btn-primary"><span className="px-2 text-blue-600">
                  <Save className="text-blue-500 cursor-pointer" />
                </span>Salvar</button></div>
      </form>
        </div>
      </div>
    </div>
  );
}
