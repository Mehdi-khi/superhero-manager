import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHeroById } from "../api/heroApi";
import type { Hero } from "../types/Hero";
import axios from "axios";
import { canEdit, canDelete } from "../utils/auth";

function HeroDetails() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    async function loadHero() {
      if (!id) return;
      const data = await getHeroById(id);
      setHero(data);
    }

    loadHero();
  }, [id]);

  if (!hero) {
    return <p className="loading">Chargement...</p>;
  }

const imageUrl = hero.image
  ? `http://localhost:5000${hero.image}`
  : hero.slug
  ? `/images/lg/${hero.slug}.jpg`
  : "/images/lg/1-a-bomb.jpg";
  return (
    <main className="details-page">
      <Link to="/dashboard" className="back-link">← Retour</Link>

      <section className="details-card">
        <img src={imageUrl} alt={hero.name} />

        <div className="details-content">
          <h1>{hero.name}</h1>
          <p className="publisher">{hero.biography?.publisher}</p>

          <h3>Biographie</h3>
          <p><strong>Nom complet :</strong> {hero.biography?.fullName || "Inconnu"}</p>
          <p><strong>Alignement :</strong> {hero.biography?.alignment || "Inconnu"}</p>
          <p><strong>Alias :</strong> {hero.biography?.aliases?.join(", ") || "Aucun"}</p>

          <h3>Statistiques</h3>
          <div className="details-stats">
            <span>Intelligence : {hero.powerstats?.intelligence}</span>
            <span>Force : {hero.powerstats?.strength}</span>
            <span>Vitesse : {hero.powerstats?.speed}</span>
            <span>Durabilité : {hero.powerstats?.durability}</span>
            <span>Pouvoir : {hero.powerstats?.power}</span>
            <span>Combat : {hero.powerstats?.combat}</span>
          </div>
          {canEdit() && (
            <Link to={`/edit/${hero._id}`} className="edit-link">
              Modifier le héros
            </Link>
          )}
          {canDelete() && (
            <button className="delete-btn" onClick={handleDelete}>
              Supprimer le héros
            </button>
          )}
            
        </div>
      </section>
    </main>
  );
  async function handleDelete() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Connecte-toi d'abord");
    return;
  }

  await axios.delete(`http://localhost:5000/api/heroes/${hero?._id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  window.location.href = "/";
}
}

export default HeroDetails;