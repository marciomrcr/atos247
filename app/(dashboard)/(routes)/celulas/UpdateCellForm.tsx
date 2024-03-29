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


const formSchema = z.object({
  name: z
  .string()
    .min(3, "O Nome deverá ter pelo menos 3 letras.")
    .trim()
    .transform((name) => {
      return name
        .charAt(0)
        .toUpperCase()
        .concat(
          name
            .substring(1)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );
    }),
        
  redeId: z.string().nonempty('Escolha uma rede!'),
});

type Cell = z.infer<typeof formSchema>;


interface ICellForm{
  cell: {
    id: string,
    name: string,
    redeId: string
  },
  networks: {
    id: string,
    name: string
  }[]

}

export default function UpdateCellForm({ networks, cell }: ICellForm) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Cell>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: cell.name,
      redeId: cell.redeId,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: Cell) => {
    // Transforme a primeira letra da primeira palavra em maiúscula
    // const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    try {
      await axios.patch(`api/celulas/${cell.id}`, {
        name: data.name,
        redeId: data.redeId, 
      });

      router.refresh(); // Usar router.replace para evitar histórico duplicado
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar a célula:', error);
    }
  };

  useEffect(() => {
    setValue('name', cell.name);
    setValue('redeId', cell.redeId);
  }, [cell, setValue]);

  return (
    <div>
      <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {cell.name}</h1>

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
               <Controller
                name="redeId"
                control={control}
                render={({ field, fieldState }) => (

                  <div>
              <label className="text-gray-200 mt-2">Escolha uma rede</label>
              <select
                className={`mb-3 w-full input input-bordered ${
                  errors.redeId ? "input-error" : ""
                }`}
                {...field}
              >
                {networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
              {errors.redeId && (
                <p className="text-red-500">{errors.redeId.message}</p>
              )}
            </div>
                )}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
