'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Network {
  id: string;
  name: string;
}

interface FormData {
  id: string; // Vamos manter o campo "id" mesmo que seja somente leitura
  name: string;
}

const NetworkList = () => {
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
    } catch (error) {
      console.error('Error deleting network:', error);
    }
  };

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
      <h1>Lista de Networks</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {networks.map((network) => (
            <tr key={network.id}>
              <td>{network.id}</td>
              <td>{network.name}</td>
              <td>
                <button onClick={() => handleEdit(network)}>Editar</button>
                <button onClick={() => handleDelete(network.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulário de Edição */}
      {selectedNetwork && (
        <div>
          <h2>Editar Network</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register('id')} value={selectedNetwork.id} />
            <input type="text" {...register('name')} defaultValue={selectedNetwork.name} />
            <button type="submit" disabled={!isDirty}>
              Salvar
            </button>
            <button onClick={() => setSelectedNetwork(null)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NetworkList;
