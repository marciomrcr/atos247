
import type { Metadata } from "next";
import Link from "next/link";

import { getCells } from "@/actions/getCells";
import { AlertCircleIcon, View } from "lucide-react";

import { getMembers } from "@/actions/getMembers";
import DeleteMemberForm from "./DeleteMemberForm";
import MemberForm from "./MemberForm";
import UpdateMemberForm from "./UpdateMemberForm";


export const metadata: Metadata = {
  title: "Membros - Atos 2.47",
};

async function MemberPage() {
  const [persons, cells] = await Promise.all([getMembers(), getCells()])


  return (
    <div className="mt-3">
      <div className=" mb-4 px-3">
        <MemberForm cells={cells} />
      </div>

      <div>
        {persons.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
            <p className='text-red-600 text-xl text-center'>Nenhum membro cadastrado. Cadastre o primeiro membro 👨‍👩‍👧‍👦 </p></div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th className='hidden md:table-cell'>#</th>
                <th>Nome</th>
                <th>Célula</th>
                <th className="hidden md:table-cell">Rede</th>
                <th className="hidden md:table-cell">Email</th>
                <th className="hidden md:table-cell">Fone</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {persons?.map((person, index) => (
                
                <tr key={person.id}>
                  <td className='hidden md:table-cell'>{index + 1}</td>
                  <td className='w-auto'>{person.name}</td>
                  <td className=''>
                    <Link href={"/cells/" + person.Membresia.map((item)=> item.cellId)} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                    {person.Membresia.map((item)=> item.cell?.name)}</Link></td>

                  <td className='hidden md:table-cell'>
                    <Link href={"/networks/" + person.Membresia.map((item)=> item.cell?.network.id)} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                    {person.Membresia.map((item)=> item.cell?.network.name)}</Link></td>

                  <td className='hidden md:table-cell'>{person.email}</td>
                  <td className='hidden md:table-cell'>{person.phone}</td>
                  <td className='flex justify-center items-center space-x-1'>
                    <DeleteMemberForm id={person.id} name={person.name} email={person.email}  />
                    <UpdateMemberForm  person={person} />
                    <Link href={"/persons/" + person.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
                      <View /></Link>
                      
                      
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MemberPage;