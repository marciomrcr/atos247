'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Edit, Save, XOctagon } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation'; // Corrigir import
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export const metadata: Metadata = {
  title: "Células - Atos 2.47",
};

const CellSchema = z.object({
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
    .trim()
    .nonempty('O nome não pode ficar em branco!')
    .min(3, "O Nome deverá ter pelo menos 3 letras."),
    email: z
    .string()
    .trim()
    .nonempty('O email não pode ficar em branco!')
    .email('Digite um email inválido!'),
  cellId: z.string().nonempty('Escolha uma célula!'),
});



type Member = z.infer<typeof formSchema>;
type Cell = z.infer<typeof CellSchema>;

interface IMemberForm{
  member: {
    id: string,
    name: string,
    email: string,
    cellId:string
  },
  cells: {
    id: string,
    name: string
  }[]

}

export default function UpdateMemberForm({ cells, member }: IMemberForm) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Member>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member.name,
      email: member.email,
      cellId: member.cellId,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: Member) => {
    // Transforme a primeira letra da primeira palavra em maiúscula
    const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    try {
      await axios.patch(`api/members/${member.id}`, {
        name: formattedName,
        email: data.email,
        cellId: data.cellId, // Usar data.cellId em vez de Cell
      });

      router.refresh(); // Usar router.replace para evitar histórico duplicado
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar a célula:', error);
    }
  };

  useEffect(() => {
    setValue('name', member.name);
    setValue('email', member.email);
    setValue('cellId', member?.cellId);
  }, [member, setValue]);

  return (
    <div>
      <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {member.name}</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 w-full">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    type="text"
                    {...field}
                    autoComplete="off"
                    className={`input input-bordered ${
                      fieldState.invalid ? 'input-error' : ''
                    }`}
                  />
                )}
              />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <input
                    type="text"
                    {...field}
                    autoComplete="off"
                    className={`input input-bordered ${
                      fieldState.invalid ? 'input-error' : ''
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <Controller
                name="cellId"
                control={control}
                render={({ field, fieldState }) => (

                  <div>
              <label className="text-gray-200 mt-2">Escolha uma célula</label>
              <select
                className={`mb-3 w-full input input-bordered ${
                  errors.cellId ? "input-error" : ""
                }`}
                {...field}
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
                )}
              />            
            </div>         

            <div className="modal-action">
              <div
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
                className="cursor-pointer flex items-center"
              >
                <XOctagon className="text-red-600" />
                <span className="text-red-600 px-2">Cancelar</span>
              </div>
              <button type="submit" className="flex items-center">
                <span className="px-2 text-blue-600">
                  <Save className="text-blue-500 cursor-pointer" />
                </span>
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
