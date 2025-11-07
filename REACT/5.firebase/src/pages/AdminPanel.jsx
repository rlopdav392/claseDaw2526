import { useEffect, useState } from "react";
import AdminUsers from "../components/AdminUsers";

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  return (
    <AdminUsers
      users={users}
      onDeleteUser={handleDeleteUser}
      onUpdateUser={handleUpdateUser}
    />
  );
}

export default AdminPanel;
