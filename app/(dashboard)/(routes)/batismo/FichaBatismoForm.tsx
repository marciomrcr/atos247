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
    phone: z
    .string()
    .trim()
   .min(11, 'Digite o número do telefone com DDD')
   .max(11, 'Digite o número do telefone com DDD')
    .nonempty('O telefone não pode ficar em branco!'),
 
  anjo: z.string().nonempty('Informe um anjo'),
  cellId: z.string().nonempty('Escolha uma Célula!'),
  batismo: z.string().nonempty('Obrigatório informar a data de batismo').pipe(z.coerce.date()),
  birthDay: z.string().nonempty('Obrigatório informar a data de nascimento').pipe(z.coerce.date()),
  cep: z.string().nonempty('Digite um cep válido')
  .min(8, "Digite um cep com 8 dígitos"),
  logradouro: z.string().nonempty('Digite um endereço'),
  complemento: z.string().optional(),

  

});

type Member = z.infer<typeof formSchema>;
type Cell = z.infer<typeof cellSchema>;

export default function MemberForm({ cells }: { cells: Cell[] }) {
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
    <div className="w-full">
      <button className="btn" onClick={handleModal}>
      Nova Ficha
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="mb-0 mt-0 text-lg text-center font-bold">
            Ficha de Batismo
          </h1>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-0 min-h-full">
          <div>
              <label className="text-gray-200 mt-0">Batismo</label>
              <input
                placeholder="Data do batismo"
                type="date"
                autoComplete="off"
                className={`mb-2 w-full input input-bordered ${
                  errors.batismo ? "input-error" : ""
                }`}
                {...register("batismo")}
              />
              {errors.batismo && (
                <p className="text-red-500">{errors.batismo.message}</p>
              )}
            </div>

            <div className="mb-0">
              <label className="text-gray-200 mt-0 mb-0">Anjo</label>
              <input
                placeholder="Nome do anjo da guarda"
                type="text"
                autoComplete="on"
                className={`mb-2 w-full input input-bordered ${
                  errors.anjo ? "input-error" : ""
                }`}
                {...register("anjo")}
              />
              {errors.anjo && (
                <p className="text-red-500">{errors.anjo.message}</p>
              )}
            </div>

            <div className="mb-0">
              <label className="text-gray-200 mt-0 mb-0">Nome do Membro</label>
              <input
                placeholder="Nome"
                type="text"
                autoComplete="off"
                className={`mb-2 w-full input input-bordered ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>


            <div className="mb-0 mt-0">
              <label className="text-gray-200 mt-0">Email</label>
              <input
                placeholder="Email"
                type="email"
                autoComplete="off"
                className={`mb-2 w-full input input-bordered ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-gray-200 mt-0">Telefone</label>
              <input
                placeholder="Telefone"
                type="tel"
                autoComplete="off"
                className={`mb-2 w-full input input-bordered ${
                  errors.phone ? "input-error" : ""
                }`}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-200 mt-0">Nascimento</label>
              <input
                placeholder="Data de nascimento"
                type="date"
                autoComplete="off"
                className={`mb-2 w-full input input-bordered ${
                  errors.birthDay ? "input-error" : ""
                }`}
                {...register("birthDay")}
              />
              {errors.birthDay && (
                <p className="text-red-500">{errors.birthDay.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-200 mt-2">Escolha uma célula</label>
              <select
                className={`mb-3 w-full input input-bordered ${
                  errors.cellId ? "input-error" : ""
                }`}
                {...register("cellId", { required: true })}
              >
                {cells.map((cell) => (
                  <option key={cell.id} value={cell.id}>
                    {cell.name}
                  </option>
                ))}
              </select>
              {errors.cellId && (
                <p className="text-red-500">{errors.cellId.message}</p>
              )}
            </div>

            <div className="mb-0">
              <label className="text-gray-200 mt-0 mb-0">CEP</label>
              <input
                placeholder="CEP"
                type="text"
                autoComplete="off"
                className={`mb-2 w-full input input-bordered ${
                  errors.cep ? "input-error" : ""
                }`}
                {...register("cep")}
              />
              {errors.cep && (
                <p className="text-red-500">{errors.cep.message}</p>
              )}
            </div>

            {/* Adicione validação para cellId, se necessário */}
           

            <div className="modal-action">
              <button
                type="button"
                onClick={handleModal}
                className="btn bg-red-500 mb-2"
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
