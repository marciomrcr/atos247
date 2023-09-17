
import { getCells } from "@/actions/getCells";
import { getMembers } from "@/actions/getMembers";
import { AlertCircleIcon, ViewIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import DeleteMemberForm from "./DeleteMemberForm";
import UpdateMemberForm from "./UpdateMemberForm";
interface IModal {
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Membros - Atos 2.47",
};

export default async function TableMembers() {
  const [members, cells] = await Promise.all([getMembers(), getCells()])
  return (

    <div>
      {members.length === 0 ? (
        <div className="flex items-center justify-center space-x-2 mt-6" ><AlertCircleIcon />
          <p className='text-red-600 text-xl text-center'>Nenhum membro cadastrado. Cadastre o primeiro membro 👨‍👩‍👧‍👦 </p></div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th className=' '>#</th>
              <th>Nome</th>
              <th>Célula</th>
              <th>Rede</th>
              <th>Email</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member, index: number) => (
              <tr key={member.id}>
                <td className=' '>{index + 1}</td>
                <td className='w-1/3'>{member.name}</td>
                <td className='w-1/3'>
                  <Link href={"/cells/" + member.Cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                    {member.Cell.name}</Link></td>
                <td className='w-1/3'><Link href={"/networks/" + member.Cell.Network.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                  {member.Cell.Network.name}</Link></td>
                <td className='w-1/3'>{member.email}</td>
                <td className='flex justify-center space-x-1'><DeleteMemberForm id={member.id} name={member.name} cellId={member.cellId} />
                  <UpdateMemberForm cells={cells} member={member} />
                  <ViewIcon />
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  )
}
