
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
  const [members, cells] = await Promise.all([getMembers(), getCells()])


  return (
    <div className="mt-3">
      <div className=" mb-4">
        <MemberForm cells={cells} />
      </div>

      <div>
        {members.length === 0 ? (
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
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {members?.map((member, index) => (
                <tr key={member.id}>
                  <td className='hidden md:table-cell'>{index + 1}</td>
                  <td className='w-auto'>{member.name}</td>
                  <td className=''>
                    <Link href={"/cells/" + member.cell.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                      {member.cell.name}</Link></td>
                  <td className='hidden md:table-cell'><Link href={"/networks/" + member.cell.network.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline'>
                    {member.cell.network.name}</Link></td>
                  <td className='hidden md:table-cell'>{member.email}</td>
                  <td className='flex justify-center items-center space-x-1'><DeleteMemberForm id={member.id} name={member.name} cellId={member.cellId} />
                    <UpdateMemberForm cells={cells} member={member} />
                    <Link href={"/members/" + member.id} className='cursor-pointer hover:text-blue-500 hover:font-semibold underline flex items-center gap-1'>
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
