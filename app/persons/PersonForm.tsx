"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Save, XOctagon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    email: z
    .string()
    .trim()
    .nonempty('O email não pode ficar em branco!')
    .email('Digite um email inválido!')
    .toLowerCase(),
 
  origem: z.enum(["Outra_igreja", "Batismo", "Existente"], {
    errorMap: () => {
      return {message: 'Escolha uma opção!'}
    }
  }),
  phone: z.number({
    errorMap: () =>{
      return {message: 'Informe um número válido: 91999999999'}
    }
  }).positive('Números maiores ou iguais a zero').lte(99999999999, 'Informe um número válido').gte(11111111111, 'Informe um DDD + número válidos'),
  birthDay: z.string().pipe(z.coerce.date())
  // z.date().min(new Date("1923-01-01"), { message: "Idade máxima 110 anos" }).max(new Date("2009-01-01"), { message: "Tem que ter no mínimo 14 anos!" })
  // .refine((date)=> new Date(date).toString() !== 'Data inválida',{
  //   message: 'É necessário um data válida',
  // }).transform((date) => new Date(date))

});

type Member = z.infer<typeof formSchema>;
type Cell = z.infer<typeof cellSchema>;

export default function PersonForm() {
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

  useEffect(() => {
    setFocus("name")
  }, [setFocus])



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
      const response = await fetch("api/persons", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar o membro!");
      }

      toast.success("Membro cadastrado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });

      refresh();
      handleModal();
    } catch (error) {
      console.error("Erro ao cadastrar o membro:", error);
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
        Add Membro
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-2 text-lg text-center font-bold">
            Cadastrar novo Membro
          </h1>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
            <div>
              <label className="text-gray-200 mt-2">Nome do Membro</label>
              <input
                placeholder="Nome"
                type="text"
                autoComplete="off"
                className={`mb-3 w-full input input-bordered ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-200 mt-2">Email</label>
              <input
                placeholder="Email"
                type="email"
                autoComplete="off"
                className={`mb-3 w-full input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-gray-200 mt-2">Telefone</label>
              <input
                placeholder="Telefone 91999999999"
                type="text"
                autoComplete="off"
                className={`mb-3 w-full input input-bordered ${
                  errors.phone ? "input-error" : ""
                }`}
                {...register("phone", {
                  setValueAs: (Value: string) => parseInt(Value)
                })}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="text-gray-200 mt-2">Nascimento</label>
              <input
                placeholder="dd/mm/aaaa"
                type="date"               
                className={`mb-3 w-full input input-bordered ${
                  errors.birthDay ? "input-error" : ""
                }`}
                {...register("birthDay")}
              />
              {errors.birthDay && (
                <p className="text-red-500">{errors.birthDay.message}</p>
              )}
            </div>

            <div>
          
            <label>Origen do membro?</label>
      <select 
      className={`mb-3 w-full input input-bordered ${
        errors.name ? "input-error" : ""
      }`}
      
      {...register("origem")}>
        <option value="Existente">Existente</option>
        <option value="Batismo">Batismo</option>
        <option value="Outra_igreja">Outra igreja/denominação</option>
      </select>
      {errors.origem && (
                <p className="text-red-500">{errors.origem.message}</p>
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
