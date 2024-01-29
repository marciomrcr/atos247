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
    .min(3, "O Nome deverá ter pelo menos 3 letras.")
    .trim()
    .transform(name => {
      return name.trim().split('').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join('')
    }),
  


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
  multiplicacao: z.boolean(),
  networkId: z.string().nonempty('Escolha uma rede!'),
  celulaGeradaId: z.string()
});

type Cell = z.infer<typeof formSchema>;
type Network = z.infer<typeof networkSchema>;

export default function CellMultiplicationForm({ networks }: { networks: Network[] }, {cells}: {cells: Cell[]}) {
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
      <button className="btn" onClick={handleModal}>
        Multiplicar Célula
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-2 text-lg text-center font-bold">
            Cadastrar uma Célula
          </h1>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
            <div>
           
              <label className=" flex justify-center items-center space-x-2">
              <input
              type="checkbox"
                id="multiplicacao"
                
                className={`block rounded-md  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  ${errors.multiplicacao ? "input-error" : ""
                  }`}
                {...register("multiplicacao", { required: true })}
              />
               <span className="text-gray-500">É uma célula multiplicada?</span>
              </label>              
                {errors.multiplicacao && (
                  <p className="text-red-500">{errors.multiplicacao.message}</p>
                )}              
            </div>

            <div>
              <label className="text-gray-200 mt-2">Nome da Célula</label>
              <input
                placeholder="Nome da rede"
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
            <div className="sm:col-span-3">
                      <label htmlFor="celulaGeradaId" className="block text-sm font-medium leading-6 text-gray-900">
                        Escolha uma Célula
                      </label>
                      <div className="mt-2">
                        <select
                          id="celulaGeradaId"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.celulaGeradaId ? "input-error" : ""
                            }`}
                          {...register("celulaGeradaId", { required: true })}
                        >
                          {cells?.map((cell) => (
                            <option key={cell.celulaGeradaId} value={cell.celulaGeradaId}>
                              {cell.name}
                            </option>
                          ))}
                        </select>
                      </div>
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
