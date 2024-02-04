"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Save, XOctagon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cell } from "recharts";

export const metadata: Metadata = {
  title: "Células - Atos 2.47",
};

const networkSchema = z.object({
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
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),  
  networkId: z.string().nonempty('Escolha uma rede!'),
  
});

type Cell = z.infer<typeof formSchema>;
type Network = z.infer<typeof networkSchema>;

export default function CellForm({ networks }: { networks: Network[] }, {cells}: {cells: Cell[]}) {
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Cell>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    criteriaMode: 'all',
  });
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
    reset();
  };

  const refresh = () => {
    router.refresh();
  };

  const handleSubmitForm = async (data: Cell) => {

    setLoading(true);

    try {
      const response = await fetch("api/cells", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar a célula!");
      }

      toast.success("Célula cadastrada com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });

      refresh();
      handleModal();
    } catch (error) {
      console.error("Erro ao cadastrar a célula:", error);
      // toast.error(error.message, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button className="btn ml-4" onClick={handleModal}>
        Add Célula
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-2 text-lg text-center font-bold">
            Cadastrar nova Célula
          </h1>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
           

            <div>
              <label className="text-gray-200 mt-2">Nome da Célula</label>
              <input
                placeholder="Nome..."
                type="text"
                autoComplete="off"
                className={`mb-3 w-full input input-bordered ${errors.name ? "input-error" : ""
                  }`}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Adicione validação para networkId, se necessário */}
            
            <div>
              <label className="text-gray-200 mt-2">Escolha uma rede</label>
              <select
                className={`mb-3 w-full input input-bordered ${errors.networkId ? "input-error" : ""
                  }`}
                {...register("networkId", { required: true })}
              >
                {networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
              {errors.networkId && (
                <p className="text-red-500">{errors.networkId.message}</p>
              )}
            </div>
            

            <div className="modal-action">
              <button
                type="button"
                onClick={handleModal}
                className="btn bg-red-500 mb-3"
              >
                <span className="px-2 text-blue-600">
                  <XOctagon className="text-red-500-500 cursor-pointer" />
                </span>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <span className="px-2 text-blue-600">
                  <Save className="text-blue-500 cursor-pointer" />
                </span>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
