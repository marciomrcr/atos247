'use client'
import axios from 'axios';
import { Edit, Save, Trash2, XOctagon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NetworkForm from '../networks/NetworkForm';

interface Network {
  id: string;
  name: string;
}

interface FormData {
  id: string; // Vamos manter o campo "id" mesmo que seja somente leitura
  name: string;
}

const NetworkList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [networks, setNetworks] = useState<Network[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty, errors },
  } = useForm<FormData>();

  useEffect(() => {
    fetchNetworks();
  }, []);

  const fetchNetworks = async () => {
    try {
      const response = await axios.get<Network[]>('api/networks');
      setNetworks(response.data);
    } catch (error) {
      console.error('Error fetching networks:', error);
    }
  };

  const handleEdit = (network: Network) => {
    setSelectedNetwork(network);
    setValue('name', network.name);
  };

  const handleDelete = async (networkId: string) => {
    try {
      await axios.delete(`api/networks/${networkId}`);
      fetchNetworks(); // Atualiza a lista após a exclusão
      setIsOpen(false)
    } catch (error) {
      console.error('Error deleting network:', error);
    }
  };
  const handleModal = () =>{
    setIsOpen(!isOpen)
    
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!selectedNetwork) {
      return;
    }

    try {
      await axios.patch(`api/networks/${selectedNetwork.id}`, data);
      setSelectedNetwork(null);
      setValue('name', ''); // Limpa o campo de nome após a edição
      fetchNetworks(); // Atualiza a lista após a edição
    } catch (error) {
      console.error('Error editing network:', error);
    }
  };

  return (
    <div>
       <div className="mx-4">
        <NetworkForm />
        {/* <CellForm networks={networks}/> */}
      </div>
      <h1 className='text-center text-2xl font-semibold '>Redes Cadastradas</h1>
      <div>
      {networks.length === 0 ? (
           <p className='text-red-600 text-xl'>Nenhuma rede cadastrada</p>
        ) : (<table className="table w-full">
        <thead>
          <tr>
            <th className=" ">#</th>
            <th>Nome</th>
            <th>Células</th>
            <th>Membros</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>

      {networks.map((network, index) => (
        // // Calcula o total de membros
        // const totalMembers = network.cell.reduce(
        //   (total, item) => total + item._count.member,
        //   0
        // );
        <tr key={network.id}>
          <td className=" ">{index + 1}</td>
          <td>{network.name}</td>
          <td className='flex items-center space-x-2'>

          <button onClick={() => handleEdit(network)} className="cursor-pointer">
      <Edit onClick={handleModal} className="text-blue-500 cursor-pointer" />
        </button>  
          
          <Trash2 onClick={() => handleDelete(network.id)} className="cursor-pointer"/>
          
            
          </td>
        </tr>
      ))}
    </tbody>
  </table>)
      
       } </div>

      {/* Formulário de Edição */}
      {selectedNetwork && (
        <div className={
          isOpen ? 'modal modal-open' : 'modal'}>
          <div className='modal-box mb-72'>
          <h1 className="mb-2 text-lg text-center font-bold">Atualizar {selectedNetwork.name} </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('id')} value={selectedNetwork.id} />
            <input type="text" {...register('name')} defaultValue={selectedNetwork.name} />
            <div className='modal-action'>   
        <div onClick={handleModal} className="cursor-pointer flex items-center">
         <XOctagon  className=" text-red-600" onClick={() => setSelectedNetwork(null)} />
          <span className=" text-red-600 px-2">Cancelar</span></div>
          
          <button type='submit' disabled={!isDirty}         
          className="flex items-center">
            <span className='px-2 text-blue-600'><Save  className="text-blue-500 cursor-pointer" /></span>Atualizar
            </button>          
          
        </div>
            
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkList;
