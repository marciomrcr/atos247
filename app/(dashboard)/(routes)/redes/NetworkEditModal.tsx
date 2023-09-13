'use client'
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Network {
  id: string;
  name: string;
}

interface NetworkEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNetwork: Network | null;
  fetchNetworks: () => void;
}

interface NetworkFormData {
  name: string;
}

const NetworkEditModal: React.FC<NetworkEditModalProps> = ({
  isOpen,
  onClose,
  selectedNetwork,
  fetchNetworks,
}) => {
  const { register, handleSubmit, setValue } = useForm<NetworkFormData>();

  useEffect(() => {
    if (selectedNetwork) {
      setValue('name', selectedNetwork.name);
    }
  }, [selectedNetwork]);

  const onSubmit = async (data: NetworkFormData) => {
    if (!selectedNetwork) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/networks/${selectedNetwork.id}`, data);
      onClose();
      fetchNetworks(); // Atualiza a lista após a edição
    } catch (error) {
      console.error('Error editing network:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
              <h5 className="modal-title">Editar Network</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nome:</label>
                <input {...register('name')} className="form-control" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Fechar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NetworkEditModal;
