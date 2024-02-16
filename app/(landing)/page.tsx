import { prisma } from "@/lib/prisma";
import { Cross } from 'lucide-react';
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rede Ide",
  description: "Visão geral da gestão de células.",
}

async function getRedes() {
  const res = await prisma.rede.count();
  return res;
}
async function getCelulas() {
  const res = await prisma.celula.count();
  return res;
}

async function getRedesGerais() {
  const res = await prisma.rede_Geral.count();
  return res;
}


const DashboardPage = async () => {
  const [redes, celulas, redesGerais] = await Promise.all( [ getRedes(), getCelulas(), getRedesGerais()])
  return (
    

<div className="">
<div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title text-black">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>


</div>



  );
};

export default DashboardPage;




