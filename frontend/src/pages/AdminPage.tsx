import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface Log {
  _id: string;
  action: string;
  heroName: string;
  userRole: string;
  createdAt: string;
}

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");

      if (!token) return;

      const usersResponse = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const logsResponse = await axios.get(
        "http://localhost:5000/api/admin/logs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(usersResponse.data);
      setLogs(logsResponse.data);
    }

    loadData();
  }, []);

  return (
    <main className="admin-page">
      <Link to="/dashboard" className="back-link">
        ← Retour
      </Link>

      <h1>Administration</h1>

      <section className="admin-section">
        <h2>Utilisateurs</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>Historique des actions</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Héros</th>
              <th>Rôle</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.action}</td>
                <td>{log.heroName}</td>
                <td>{log.userRole}</td>
                <td>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default AdminPage;