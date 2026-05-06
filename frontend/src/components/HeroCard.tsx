import { Link } from "react-router-dom";
import type { Hero } from "../types/Hero";
import { canEdit } from "../utils/auth";

interface Props {
  hero: Hero;
}

function HeroCard({ hero }: Props) {
  const imageUrl = hero.image
  ? `http://localhost:5000${hero.image}`
  : hero.slug
  ? `/images/lg/${hero.slug}.jpg`
  : "/images/lg/1-a-bomb.jpg";

  return (
    <Link to={`/hero/${hero._id}`} className="hero-card-link">
      <article className="hero-card">
        <div className="image-wrapper">
          <img src={imageUrl} alt={hero.name} />
          <span className="badge">
            {hero.biography?.publisher || "Unknown"}
          </span>
        </div>

        <div className="hero-content">
          <h3>{hero.name}</h3>
          <p>{hero.biography?.fullName || "Identité inconnue"}</p>

          <div className="stat-line">
            <span>Force</span>
            <div><b style={{ width: `${hero.powerstats?.strength ?? 0}%` }} /></div>
          </div>

          <div className="stat-line">
            <span>Vitesse</span>
            <div><b style={{ width: `${hero.powerstats?.speed ?? 0}%` }} /></div>
          </div>

          {canEdit() && (
            <span className="mini-edit">
              Modification autorisée
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}

export default HeroCard;