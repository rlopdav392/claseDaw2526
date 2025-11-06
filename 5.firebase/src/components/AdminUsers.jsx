import { useState } from "react";
import "./AdminUsers.css";

function AdminUsers({ users, onDeleteUser, onUpdateUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedUser(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...selectedUser,
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };
    onUpdateUser(updated);
    setIsPanelOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="admin-table-container">
      <h2>Gestión de usuarios</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Eliminar</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td data-label="ID">{u.id}</td>
              <td data-label="Nombre">{u.name}</td>
              <td data-label="Email">{u.email}</td>
              <td data-label="Rol">{u.role}</td>
              <td data-label="Eliminar">
                <button
                  className="delete-btn"
                  onClick={() => onDeleteUser(u.id)}
                >
                  🗑️
                </button>
              </td>
              <td data-label="Modificar">
                <button className="edit-btn" onClick={() => handleEdit(u)}>
                  ✏️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Panel lateral */}
      <aside className={`edit-panel ${isPanelOpen ? "open" : ""}`}>
        {selectedUser && (
          <div className="edit-panel-content">
            <div className="edit-panel-header">
              <h3>Editar usuario</h3>
              <button onClick={handleClosePanel}>✖</button>
            </div>

            <form onSubmit={handleSave} className="edit-form">
              <label>
                Nombre:
                <input name="name" defaultValue={selectedUser.name} required />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser.email}
                  required
                />
              </label>
              <label>
                Rol:
                <select name="role" defaultValue={selectedUser.role}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <div className="panel-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleClosePanel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </aside>

      {/* Fondo oscuro detrás del panel */}
      {isPanelOpen && (
        <div className="overlay" onClick={handleClosePanel}></div>
      )}
    </div>
  );
}

export default AdminUsers;
