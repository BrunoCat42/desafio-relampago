import { useState, useEffect } from "react";
import type {AssetModalProps } from "../interface/AssetInterface";


export default function AssetModal({ isOpen, onClose, onSave, assetToEdit }: AssetModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (assetToEdit) {
      setName(assetToEdit.name);
      setDescription(assetToEdit.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [assetToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (assetToEdit) {
      onSave({ id: assetToEdit.id, name, description }); // Atualização
    } else {
      onSave({ name, description }); // Criação
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{assetToEdit ? "Editar Ativo" : "Novo Ativo"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
