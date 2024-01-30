"use client"

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const metadata: Metadata = {
  title: "Membros - Atos 2.47",
};


const cellSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .nonempty('O nome não pode ficar em branco!')
    .min(3, "O Nome deverá ter pelo menos 3 letras."),
});
const cargoSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .nonempty('O nome não pode ficar em branco!')
    .min(3, "O Nome deverá ter pelo menos 3 letras."),
});

const formSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório!')
    .min(3, "O Nome deverá ter pelo menos 3 letras.")
    .trim()
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
   phone: z
    .string()
    .trim()
    .min(11, 'Digite o número do telefone com DDD')
    .max(11, 'Digite o número do telefone com DDD')
    .nonempty('Digite um telefone válido!'),
  cargoId: z.string().optional(),
  cellId: z.string().nonempty('Informe uma célula!'),
  birth: z.string().nonempty('Informe a data de nascimento').pipe(z.coerce.date())
  

});

type Member = z.infer<typeof formSchema>;
type Cell = z.infer<typeof cellSchema>;
type Cargo = z.infer<typeof cargoSchema>;


export default function BatismoFormCompleto({ cells, cargos }: { cells: Cell[], cargos: Cargo[] }) {
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Member>({
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


  const handleSubmitForm = async (data: Member) => {
    // Transforme a primeira letra da primeira palavra em maiúscula
    // const formattedName = data.name.replace(/^\w/, (c) => c.toUpperCase());
    setLoading(true);

    try {
      const response = await fetch("api/membro", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar o membro!");
      }

      toast.success("Membro cadastrada com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });

      refresh();
      handleModal();
    } catch (error) {
      console.error("Erro ao cadastrar a ficha:", error);
      // toast.error(error.message, {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
  
      <div>
        <button className="btn" onClick={handleModal}>
          Cadastro de Membros
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h1 className="mb-0 mt-0 text-lg text-center font-bold">
              Cadastro de Membros
            </h1>

            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-0 min-h-full">
              <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-2">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                    
                   
                    <div className="sm:col-span-3">
                      <label htmlFor="cellId" className="block text-sm font-medium leading-6 text-gray-900">
                        Escolha uma Célula
                      </label>
                      <div className="mt-2">
                        <select
                          id="cellId"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.cellId ? "input-error" : ""
                            }`}
                          {...register("cellId", { required: true })}
                        >
                          {cells.map((cell) => (
                            <option key={cell.id} value={cell.id}>
                              {cell.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="cargoId" className="block text-sm font-medium leading-6 text-gray-900">
                        Escolha uma Função
                      </label>
                      <div className="mt-2">
                        <select
                          id="cargoId"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.cargoId ? "input-error" : ""
                            }`}
                          {...register("cargoId", { required: true })}
                        >
                          {cargos.map((cargo) => (
                            <option key={cargo.id} value={cargo.id}>
                              {cargo.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    

                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-4">
                <h1 className="mb-0 mt-0 text-lg text-center font-bold">Informações Pessoais</h1>

                  <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Nome Completo
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Digite um nome"
                          id="name"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.name ? "input-error" : ""
                            }`}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>


                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Telefone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.phone ? "input-error" : ""
                            }`}
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    
                    <div className="sm:col-span-3">
                      <label htmlFor="birth" className="block text-sm font-medium leading-6 text-gray-900">
                        Nascimento
                      </label>
                      <div className="mt-2">
                        <input
                          id="birth"
                          type="date"
                          autoComplete="birth"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.birth ? "input-error" : ""
                            }`}
                          {...register("birth")}
                        />
                        {errors.birth && (
                          <p className="text-red-500">{errors.birth.message}</p>
                        )}
                      </div>
                    </div>

                    
                  </div>

                </div>
                <div className="">
                  {/* <p className="mt-0 text-sm leading-6 text-gray-600">
                    Este membro participa desta célula na qual ele está sendo cadastrado?
                  </p>

                  <div className="mt-0 space-y-2">
                    <fieldset>

                      <div className="mt-0 space-y-2">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          </div>
                          <div className="text-sm leading-6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                              Não participante da célula!
                            </label>
                            <p className="text-gray-500">Apenas foi batizado nessa célula.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div> */}
                </div>
              </div>





              <div className="modal-action mt-2 flex items-center justify-end gap-x-6">
                <button type="button"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={handleModal}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Salvar
                </button>
              </div>
            </form>



          </div>
        </div>
      </div>
    
  )
}
