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
  title: z
  .string()    
  .nonempty('O nome não pode ficar em branco!')
  .min(3, "O Nome deverá ter pelo menos 3 letras.")
  .trim(),
 
});

type Cargo = z.infer<typeof formSchema>;

interface ICargoForm{
  cargo: {
    id: string,
    title: string,    
  }
}

export default function CargoUpdate({cargo}: ICargoForm) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Cargo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: cargo.title,
      
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: Cargo) => {
    // Transforme a primeira letra da primeira palavra em maiúscula
    // const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    try {
      await axios.patch(`api/cargo/${cargo.id}`, {
        title: data.title,
        
      });

      // router.refresh(); // Usar router.replace para evitar histórico duplicado
      setIsOpen(false)
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar o cargo:', error);
    }
  };

  useEffect(() => {
    setValue('title', cargo.title);    
  }, [cargo, setValue]);

  return (
    <div>
      <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {cargo.title}</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 w-full">
              <Controller
                name="title"
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
               
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
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