'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Edit, Save, XOctagon } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export const metadata: Metadata = {
  title: "Redes de Células - Atos 2.47",
};

const formSchema = z.object({

  name: z.string()
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
  
});

type Network = z.infer<typeof formSchema>;

interface IFormProps {
  network: {
    id: string;
    name: string;
  };
}

export default function NetworkMotherUpdate({ network }: IFormProps) {
  const router = useRouter();
  const { handleSubmit, 
    control, 
    setValue,
    reset, 
    formState: {errors},
   } = useForm<Network>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: network.name,
    },
  });
  
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = async (data: Network) => {
    
    try {
      await axios.patch(`api/redesGerais/${network.id}`, {
        name: data.name
      });

      router.refresh();
      
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao atualizar a rede:', error);
    }
  };

  useEffect(() => {
    setValue('name', network.name);
  }, [network, setValue]);

  // const handleModal = () => {
  //   setIsOpen(!isOpen)
  //   reset()   
  // };

  return (
    <div>
      <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {network.name}</h1>

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

            <div className="modal-action">
              <div onClick={() => setIsOpen(false)}className="cursor-pointer flex items-center">
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
