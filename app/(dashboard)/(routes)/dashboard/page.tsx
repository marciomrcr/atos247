import { prisma } from "@/lib/prisma";
import { Cross } from 'lucide-react';
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview Ide",
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
<div className="card w-full bg-base-100 shadow-xl mt-4 mx-2">
  <div className="card-body">
    <h2 className="card-title text-black">Células!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">700</button>
    </div>
  </div>
</div>
<div className="card w-full bg-base-100 shadow-xl mt-4 mx-2">
  <div className="card-body">
    <h2 className="card-title text-black">Membros em células!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">7K</button>
    </div>
  </div>
</div>
<div className="card w-full bg-base-100 shadow-xl mt-4 mx-2">
  <div className="card-body">
    <h2 className="card-title text-black">Batismo esse ano!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">358</button>
    </div>
  </div>
</div>
</div>
    



  );
};

export default DashboardPage;




