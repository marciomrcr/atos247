import { getCells } from "@/actions/getCells"

interface ICell {
  cell: { id: string
   name: string
   email: string
   cell: string
   network: string
   _count: number}[]

 } 

export default async function Table({params}: {params: string}) {
  const cells = await getCells()


  return (
    <table className="table w-full bg-slate-100">
            <thead>
              <tr>
                <th className="hidden md:flex">#</th>
                <th>Célula</th>                
                <th>Membros</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cells.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="hidden md:flex">{index + 1}</td>
                    <td className="w-1/3">{item.name}</td>                    
                    <td className="w-1/3">{item._count.member} Membros</td>
                    <td className="flex justify-center space-x-1"> 
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
  )
}
