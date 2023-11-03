'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Edit, Save, XOctagon } from 'lucide-react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const metadata: Metadata = {
  title: "Redes de Células - Atos 2.47",
};

const formSchema = z.object({
  name: z.string().trim()
  .nonempty('O nome não pode ficar em branco!')
  .min(3, { message: 'O nome deverá ter pelo menos 3 letras!' })
  .trim(),
  email: z
    .string()
    .trim()
    .nonempty('O email não pode ficar em branco!')
    .email('Digite um email inválido!')
    .toLowerCase(),
  birthDay: z.string()
  .refine((date)=> new Date(date).toString() !== 'Data inválida',{
    message: 'É necessário um data válida',
  }).transform((date) => new Date(date))
  
  
});

type Person = z.infer<typeof formSchema>;

interface IFormProps {
  person: {
    id: string;
    name: string;
    email: string
    birthDay: Date
  };
}

export default function PersonUpdate({ person }: IFormProps) {
  const router = useRouter();
  const { handleSubmit, 
    register, 
    setValue,
    reset, 
    formState: {errors},
   } = useForm<Person>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: person.name,
      email: person.email,
      birthDay: person.birthDay
    },
  });
  
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = async (data: Person) => {
    
    try {
      await axios.patch(`api/persons/${person.id}`, {
        name: data.name,
        email: data.email,
        birthDay: person.birthDay
      });

      router.refresh();
      
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao atualizar a pessoa:', error);
    }
  };

  useEffect(() => {
    setValue('name', person.name);
    setValue('email', person.email);
    setValue('birthDay', person.birthDay);
  }, [person, setValue]);

 
  return (
    <div>
      <Edit className="cursor-pointer" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box mb-72">
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {person.name}</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 w-full">
              <label htmlFor="name" className='text-slate-300'>Nome</label>              
                  <input
                    type="text"
                    {...register ('name')}
                    autoComplete="off"
                    className='input input-bordered'                    
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="email" className='text-slate-300'>Email</label>              
                  <input
                    type="email"
                    {...register ('email')}
                    autoComplete="off"
                    className='input input-bordered'                    
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="birthDay" className='text-slate-300'>Nascimento</label>              
                  <input
                    type="date"
                    {...register ('birthDay')}
                    autoComplete="off"
                    className='input input-bordered'                    
              />
              {errors.birthDay && <p className="text-red-500">{errors.birthDay.message}</p>}
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
