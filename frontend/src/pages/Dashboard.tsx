import { useEffect, useState } from "react";
import { getHeroes } from "../api/heroApi";
import type { Hero } from "../types/Hero";
import HeroCard from "../components/HeroCard";
import { Link } from "react-router-dom";
import { canEdit } from "../utils/auth";

function Dashboard() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [search, setSearch] = useState("");
  const [publisher, setPublisher] = useState("");

  useEffect(() => {
    async function loadHeroes() {
      const data = await getHeroes();
      setHeroes(data);
    }
    loadHeroes();
  }, []);

  const filteredHeroes = heroes.filter((hero) => {
    const matchSearch = hero.name.toLowerCase().includes(search.toLowerCase());
    const matchPublisher =
      publisher === "" || hero.biography?.publisher === publisher;

    return matchSearch && matchPublisher;
  });
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>SuperHero</h2>
        <span>Manager</span>

        <nav>
          <Link to="/" className="active">Dashboard</Link>
          <a>Heroes</a>
          <Link to="/admin">Admin</Link>
        </nav>
      </aside>

      <main className="dashboard">
        <header className="topbar">
          <div>
            <h1>Dashboard</h1>
            <p>{filteredHeroes.length} héros affichés</p>
          </div>

          <div className="top-actions">
            {canEdit() && (
              <Link to="/add" className="add-link">
                + Ajouter un héros
              </Link>
            )}
            <button className="login-link" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </header>

        <section className="filters">
          <input
            type="text"
            placeholder="Rechercher un héros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={publisher} onChange={(e) => setPublisher(e.target.value)}>
            <option value="">Tous les univers</option>
            <option value="Marvel Comics">Marvel Comics</option>
            <option value="DC Comics">DC Comics</option>
            <option value="Dark Horse Comics">Dark Horse Comics</option>
          </select>
        </section>

        <section className="hero-grid">
          {filteredHeroes.map((hero) => (
            <HeroCard key={hero._id} hero={hero} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;