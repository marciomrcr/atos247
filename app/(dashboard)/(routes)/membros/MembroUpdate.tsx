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
    .min(9, 'Digite o número do telefone')
    .max(9, 'tem muito numero')
    .nonempty('Digite um telefone válido!'),
  // cargoId: z.string().optional(),
  // cellId: z.string().nonempty('Informe uma célula!'),
  // birth: z.string().nonempty('Informe a data de nascimento').pipe(z.coerce.date())
  
 
});

type Membro = z.infer<typeof formSchema>;

interface IMembroForm{
  membro: {
    id: string,
    name: string,    
    phone: string,    
    // cellId: string,    
    // cargoId: string,    
    // birth: Date,    
  }
}

export default function MembroUpdate({membro}: IMembroForm) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Membro>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: membro.name,
      phone: membro.phone,
      // birth: membro.birth,
      // cargoId: membro.cargoId,
      // cellId: membro.cellId,
      
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: Membro) => {
    // Transforme a primeira letra da primeira palavra em maiúscula
    // const formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    try {
      await axios.patch(`api/membro/${membro.id}`, {
        name: data.name,
        phone: data.phone,
        
      });

      // router.refresh(); // Usar router.replace para evitar histórico duplicado
      setIsOpen(false)
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar o membro:', error);
    }
  };

  useEffect(() => {
    setValue('name', membro.name);    
    setValue('phone', membro.phone);    
  }, [membro, setValue]);

  return (
    <div>
      <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {membro.name}</h1>

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
            </div>
            <div className="mb-3 w-full">
              <Controller
                name="phone"
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
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
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