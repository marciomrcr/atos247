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
  title: "Redes de Células - Jetro",
};

const networkMotherSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .nonempty('O nome não pode ficar em branco!')    
});

const formSchema = z.object({
  name: z
  .string()    
  .nonempty('O nome não pode ficar em branco!')
  .min(3, "O Nome deverá ter pelo menos 3 letras.")
  .trim()
  .transform(name =>{
    return name.trim().split(' ').map(word =>{
      return word[0].toLocaleUpperCase().concat(word.substring(1))
    }).join(' ')
  }),
  redeGeralId: z
  .string()    
  .nonempty('O nome não pode ficar em branco!')
});

type Network = z.infer<typeof formSchema>;
type NetworkMother = z.infer<typeof networkMotherSchema>;

export default function RedesForm({ networksMothers }: { networksMothers: NetworkMother[] }) {
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
   
  const response = await fetch("api/redes", {
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

refresh()
handleModal() 
setLoading(true);
 } 

  return (
    <div>
      <button className="btn w-[200px]" onClick={handleModal}>
        Add Rede de Células
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-2 text-lg text-center font-bold">
            Cadastrar nova Rede
          </h1>
        
      <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
      <div>
              <label className="text-gray-200 mt-2">Escolha uma rede Geral</label>
              <select
                className={`mb-3 w-full input input-bordered ${errors.redeGeralId ? "input-error" : ""
                  }`}
                {...register("redeGeralId", { required: true })}
              >
                {networksMothers.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
              {errors.redeGeralId && (
                <p className="text-red-500">{errors.redeGeralId.message}</p>
              )}
            </div>
      <div>
      <label className="text-gray-200 mt-2">Nome da Rede</label>
      <input placeholder="Nome da rede" type="text"
      autoComplete="off"
      className="mb-3 w-full input input-bordered"
      {...register('name')} />         
    {errors.name && (<p className="text-black">{errors.name.message}</p>)}  </div> 
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
