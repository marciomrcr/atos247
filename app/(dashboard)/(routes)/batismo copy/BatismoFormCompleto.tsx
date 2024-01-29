"use client"

/*
  This example requires some changes to your config:
  
  ```
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


const cellSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .nonempty('O nome não pode ficar em branco!')
    .min(3, "O Nome deverá ter pelo menos 3 letras."),
});

const anjoSchema = z.object({
  id: z.string(),
  name: z
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
  email: z
    .string()
    .trim()
    .nonempty('O Email obrigatório!')
    .email('Digite um email inválido!')
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(11, 'Digite o número do telefone com DDD')
    .max(11, 'Digite o número do telefone com DDD')
    .nonempty('Digite um telefone válido!'),

  bairro: z.string().nonempty('Obrigatório'),
  cidade: z.string().nonempty('Obrigatório'),
  complemento: z.string().optional(),
  numero: z.string().nonempty('Obrigatório'),
  logradouro: z.string().nonempty('Digite um endereço'),
  cep: z.string().nonempty('Digite um cep válido')
    .min(8, "Digite um cep com 8 dígitos"),
  sexo: z.string().nonempty('Escolha o sexo!'),
  anjo: z.string().nonempty('Escolha um anjo da guarda!'),
  cellId: z.string().nonempty('Escolha uma Célula!'),
  batismo: z.string().nonempty('Informe a data de batismo').pipe(z.coerce.date()),
  birthDay: z.string().nonempty('Informe a data de nascimento').pipe(z.coerce.date())
  // batismo: z.date({required_error:'Obrigatório informar a data de batismo'}),
  // birthDay: z.date({required_error:'Obrigatório informar a data de nascimento'}),
  // address: z
  // .string().nonempty('Obrigatório')

});

type Member = z.infer<typeof formSchema>;
type Cell = z.infer<typeof cellSchema>;
type Anjo = z.infer<typeof anjoSchema>;

export default function BatismoFormCompleto({ cells }: { cells: Cell[] }, { anjos }: { anjos: Anjo[] }) {
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
      const response = await fetch("api/batismo", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar a ficha de batismo!");
      }

      toast.success("Ficha cadastrada com sucesso!", {
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
          Ficha de Batismo
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h1 className="mb-0 mt-0 text-lg text-center font-bold">
              Ficha de Batismo
            </h1>

            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-0 min-h-full">
              <div className="space-y-2">
                <div className="border-b border-gray-900/10 pb-2">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                      <label htmlFor="batismo" className="block text-sm font-medium leading-6 text-gray-900">
                        Data do Batismo
                      </label>
                      <div className="mt-2">
                        <input
                          id="batismo"
                          type="date"
                          autoComplete="batismo"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-5 pl-2 ${errors.batismo ? "input-error" : ""
                            }`}
                          {...register("batismo")}
                        />
                        {errors.batismo && (
                          <p className="text-red-500">{errors.batismo.message}</p>
                        )}
                      </div>
                    </div>
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

                    <div className="sm:col-span-6 mb-2">
                      <label htmlFor="anjo" className="block text-sm font-medium leading-6 text-gray-900">
                        Informe o anjo da guarda
                      </label>
                      <div className="mt-2">
                      <input
                          type="text"
                          placeholder="Digite o nome do anjo"
                          id="anjo"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.anjo ? "input-error" : ""
                            }`}
                          {...register("anjo")}
                        />
                        {errors.anjo && (
                          <p className="text-red-500">{errors.anjo.message}</p>
                        )}
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



                    <div className="sm:col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          placeholder="Digite um mail"
                          id="email"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.email ? "input-error" : ""
                            }`}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
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
                      <label htmlFor="sexo" className="block text-sm font-medium leading-6 text-gray-900">
                        Sexo
                      </label>
                      <div className="mt-2">
                        <select
                          id="sexo"
                          autoComplete="off"
                          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2 ${errors.sexo ? "input-error" : ""
                            }`}
                          {...register("sexo", { required: true })}
                        >
                          <option>Feminino</option>
                          <option>Masculino</option>
                          {errors.sexo && (
                            <p className="text-red-500">{errors.sexo.message}</p>
                          )}

                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
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
                    </div>

                    <div className="sm:col-span-3">
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
                    </div>

                    <div className="sm:col-span-6">
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
                    </div>


                    <div className="sm:col-span-2">
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
                    </div>
                    <div className="sm:col-span-4">
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
                    </div>

                    <div className="sm:col-span-3 sm:col-start-1">
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
                    </div>

                    <div className="sm:col-span-3">
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
                    </div>
                  </div>

                </div>
                <div className="border-b border-gray-900/10 pb-1">
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
