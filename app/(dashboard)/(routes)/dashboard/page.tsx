import { prisma } from "@/lib/prisma";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview Rede IDE 3.",
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
<div className="card w-1/5 bg-base-100 shadow-xl mt-4 mx-2">
  <div className="card-body">
    <h2 className=" text-black font-semibold text-left">Células!</h2>
    
    <div className="card-actions justify-end">
      <button className="btn btn-primary">{celulas}</button>
    </div>
  </div>
</div>
<div className="card w-1/5 bg-base-100 shadow-xl mt-4 mx-2">
  <div className="card-body">
    <h2 className=" text-black font-semibold text-left">Redes!</h2>
    
    <div className="card-actions justify-end">
      <button className="btn btn-primary">{redes}</button>
    </div>
  </div>
</div>

<div className="card w-1/5 bg-base-100 shadow-xl mt-4 mx-2">
  <div className="card-body">
  <h2 className=" text-black font-semibold text-left">Batismo esse ano!</h2>
    
    <div className="card-actions justify-end">
      <button className="btn btn-primary">358</button>
    </div>
  </div>
</div>
</div>
    



  );
};

export default DashboardPage;




