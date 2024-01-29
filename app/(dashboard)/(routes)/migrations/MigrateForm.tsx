"use client"
/*
  requires some changes to your config:
  
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

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


const hostSchema = z.object({
  id: z.string(),
  serie: z
    .string()
    .trim()
    .nonempty('Preenchimento obrigatório!')
    .min(9, "A serie deverá ter pelo menos 10 letras."),
});


const formSchema = z.object({

  user: z
    .string()
    .trim()
    .nonempty('O Email obrigatório!')
    .email('Digite um email inválido!')
    .toLowerCase(),
  serie: z
    .string()
    .trim()
    .min(10, 'No mínimo 10 caracteres')
    .max(11, 'No máximo 10 caracteres')
    .nonempty('Preenchimento obrigatório!').toUpperCase(),
  chassi: z.string().nonempty('Preenchimento obrigatório!'),
  model: z.string().nonempty('Preenchimento obrigatório!')
    .min(8, "8 dígitos no mínimo"),
  refresh: z.string().nonempty('Preenchimento obrigatório!'),
  share: z.string().nonempty('Preenchimento obrigatório!'),
  observation: z.string().optional(),
  analyst: z.string().nonempty('Escolha um analista'),
  migrateDate: z.string().nonempty('Informe a data de migração').pipe(z.coerce.date()),
});

type Migrate = z.infer<typeof formSchema>;

export default function BatismoFormCompleto() {
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Migrate>({
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


  const handleSubmitForm = async (data: Migrate) => {
    // Transforme a primeira letra da primeira palavra em maiúscula
    // const formattedName = data.name.replace(/^\w/, (c) => c.toUpperCase());
    setLoading(true);

    try {
      const response = await fetch("api/migrations", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar a migração!");
      }

      toast.success("Migração cadastrada com sucesso!", {
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
        Registro de Migração
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-0 mt-0 text-lg text-center font-bold">
            Registro de Migração
          </h1>
          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-0 min-h-full">
              <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-2">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                      <label htmlFor="migrateDate" className="block text-sm font-medium leading-6 text-gray-900">
                        Data da migração
                      </label>
                      <div className="mt-2">
                        <input
                          id="migrateDate"
                          type="date"
                          autoComplete="migrateDate"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.migrateDate ? "input-error" : ""
                            }`}
                          {...register("migrateDate")}
                        />
                        {errors.migrateDate && (
                          <p className="text-red-500">{errors.migrateDate.message}</p>
                        )}
                      </div>
                    </div>


                   

                    <div className="sm:col-span-6 mb-2">
                      <label htmlFor="observation" className="block text-sm font-medium leading-6 text-gray-900">
                        Observação
                      </label>
                      <div className="mt-2">
                      <input
                          type="text"
                          placeholder="Digite o nome do observation"
                          id="observation"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.observation ? "input-error" : ""
                            }`}
                          {...register("observation")}
                        />
                        {errors.observation && (
                          <p className="text-red-500">{errors.observation.message}</p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-4">
                <h1 className="mb-0 mt-0 text-lg text-center font-bold">Informações Pessoais</h1>

                  <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="serie" className="block text-sm font-medium leading-6 text-gray-900">
                        Serie
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Digite um nome"
                          id="serie"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5
                           text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                             focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.serie ? "input-error" : ""
                            }`}
                          {...register("serie")}
                        />
                        {errors.serie && (
                          <p className="text-red-500">{errors.serie.message}</p>
                        )}
                      </div>
                    </div>



                    <div className="sm:col-span-6">
                      <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                        Usuário
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          placeholder="Digite um mail"
                          id="user"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.user ? "input-error" : ""
                            }`}
                          {...register("user")}
                        />
                        {errors.user && (
                          <p className="text-red-500">{errors.user.message}</p>
                        )}
                      </div>
                    </div>

                    

                    <div className="sm:col-span-3">
                      <label htmlFor="refresh" className="block text-sm font-medium leading-6 text-gray-900">
                        Refresh
                      </label>
                      <div className="mt-2">
                        <select
                          id="refresh"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                          ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                           focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2
                            ${errors.refresh ? "input-error" : ""
                            }`}
                          {...register("refresh", { required: true })}
                        >
                          <option>Nao</option>
                          <option>Sim</option>
                          {errors.refresh && (
                            <p className="text-red-500">{errors.refresh.message}</p>
                          )}

                        </select>
                      </div>
                    </div>
                    {/* <div className="sm:col-span-3">
                      <label htmlFor="birthDay" className="block text-sm font-medium leading-6 text-gray-900">
                        Nascimento
                      </label>
                      <div className="mt-2">
                        <input
                          id="birthDay"
                          type="date"
                          autoComplete="birthDay"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.birthDay ? "input-error" : ""
                            }`}
                          {...register("birthDay")}
                        />
                        {errors.birthDay && (
                          <p className="text-red-500">{errors.birthDay.message}</p>
                        )}
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-3">
                      <label htmlFor="cep" className="block text-sm font-medium leading-6 text-gray-900">
                        CEP
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="cep"
                          placeholder="66075530"
                          autoComplete="on"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.cep ? "input-error" : ""
                            }`}
                          {...register("cep")}
                        />
                        {errors.cep && (
                          <p className="text-red-500">{errors.cep.message}</p>
                        )}
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-6">
                      <label htmlFor="logradouro" className="block text-sm font-medium leading-6 text-gray-900">
                        Endereço
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Rua, travessa, passagem, etc."
                          id="logradouro"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.logradouro ? "input-error" : ""
                            }`}
                          {...register("logradouro")}
                        />
                        {errors.logradouro && (
                          <p className="text-red-500">{errors.logradouro.message}</p>
                        )}
                      </div>
                    </div> */}


                    {/* <div className="sm:col-span-2">
                      <label htmlFor="numero" className="block text-sm font-medium leading-6 text-gray-900">
                        Número
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="numero"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.numero ? "input-error" : ""
                            }`}
                          {...register("numero")}
                        />
                        {errors.numero && (
                          <p className="text-red-500">{errors.numero.message}</p>
                        )}
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-4">
                      <label htmlFor="complemento" className="block text-sm font-medium leading-6 text-gray-900">
                        Complemento
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="complemento"
                          autoComplete="address-level1"
                          placeholder="Alto, Frente, Apto, etc"
                          className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div> */}


                    {/* <div className="sm:col-span-3 sm:col-start-1">
                      <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                        Cidade
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="cidade"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.cidade ? "input-error" : ""
                            }`}
                          {...register("cidade")}
                        />
                        {errors.cidade && (
                          <p className="text-red-500">{errors.cidade.message}</p>
                        )}
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-3">
                      <label htmlFor="bairro" className="block text-sm font-medium leading-6 text-gray-900">
                        Bairro
                      </label>
                      <div className="mt-2">
                        <input
                          id="bairro"
                          type="text"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.bairro ? "input-error" : ""
                            }`}
                          {...register("bairro")}
                        />
                        {errors.bairro && (
                          <p className="text-red-500">{errors.bairro.message}</p>
                        )}
                      </div>
                     </div> */}


                  </div>

                </div>
                <div className="border-b border-gray-900/10 pb-1">
                  
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

          {/* <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-0 min-h-full">
            <div className="space-y-4 mb-3">


              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                <div className="sm:col-span-3">
                  <label htmlFor="migrateDate" className="block text-sm font-medium leading-6 text-gray-900">
                    Data da Migração
                  </label>
                  <div className="mt-2">
                    <input
                      id="migrateDate"
                      type="date"
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.migrateDate ? "input-error" : ""
                        }`}
                      {...register("migrateDate")}
                    />
                    {errors.migrateDate && (
                      <p className="text-red-500">{errors.migrateDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="chassi" className="block text-sm font-medium leading-6 text-gray-900">
                    Escolha o Chassi
                  </label>
                  <div className="mt-2">
                    <select
                      id="chassi"
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.chassi ? "input-error" : ""
                        }`}
                      {...register("chassi", { required: true })}
                    >
                      <option>Desktop</option>
                      <option>Laptop</option>
                      {errors.chassi && (
                        <p className="text-red-500">{errors.chassi.message}</p>
                      )}

                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3 mb-2">
                  <label htmlFor="serie" className="block text-sm font-medium leading-6 text-gray-900">
                    Informe o serial
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Digite o nome do serie"
                      id="serie"
                      autoComplete="on"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.serie ? "input-error" : ""
                        }`}
                      {...register("serie")}
                    />
                    {errors.serie && (
                      <p className="text-red-500">{errors.serie.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="refresh" className="block text-sm font-medium leading-6 text-gray-900">
                    Refresh?
                  </label>
                  <div className="mt-2">
                    <select
                      id="refresh"
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.refresh ? "input-error" : ""
                        }`}
                      {...register("refresh", { required: true })}
                    >
                      <option>Nao</option>
                      <option>Sim</option>
                      {errors.refresh && (
                        <p className="text-red-500">{errors.refresh.message}</p>
                      )}

                    </select>
                  </div>
                </div>


                <div className="sm:col-span-3">
                  <label htmlFor="share" className="block text-sm font-medium leading-6 text-gray-900">
                    Compartilhada?
                  </label>
                  <div className="mt-2">
                    <select
                      id="share"
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.share ? "input-error" : ""
                        }`}
                      {...register("share", { required: true })}
                    >
                      <option>Nao</option>
                      <option>Sim</option>
                      {errors.share && (
                        <p className="text-red-500">{errors.share.message}</p>
                      )}

                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6">

              <div className="sm:col-span-6">
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                  Usuário
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Digite um email @albras ou @hydro!"
                    id="user"
                    autoComplete="off"
                    className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.user ? "input-error" : ""
                      }`}
                    {...register("user")}
                  />
                  {errors.user && (
                    <p className="text-red-500">{errors.user.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                  Modelo
                </label>
                <div className="mt-2">
                  <input
                    id="model"
                    type="text"
                    autoComplete="on"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.observation ? "input-error" : ""
                      }`}
                    {...register("model")}
                  />
                  {errors.model && (
                    <p className="text-red-500">{errors.model.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="observation" className="block text-sm font-medium leading-6 text-gray-900">
                  Observação
                </label>
                <div className="mt-2">
                  <input
                    id="observation"
                    type="text"
                    autoComplete="on"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.observation ? "input-error" : ""
                      }`}
                    {...register("observation")}
                  />
                  {errors.observation && (
                    <p className="text-red-500">{errors.observation.message}</p>
                  )}
                </div>
              </div>


              <div className="sm:col-span-3 mb-3">
                <label htmlFor="refresh" className="block text-sm font-medium leading-6 text-gray-900">
                  Analista Responsável?
                </label>
                <div className="mt-2">
                  <select
                    id="refresh"
                    autoComplete="off"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.refresh ? "input-error" : ""
                      }`}
                    {...register("refresh", { required: true })}
                  >
                    <option>Euclides</option>
                    <option>Marcio</option>
                    <option>Rodrigo</option>
                    <option>Vinicius</option>
                    {errors.refresh && (
                      <p className="text-red-500">{errors.refresh.message}</p>
                    )}

                  </select>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10"> </div>
            <div className="modal-action  flex items-center justify-center gap-x-6">
              <button type="button"
                className="rounded-md bg-red-600 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={handleModal}>
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-indigo-600 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>

  )
}
