import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as yup from "yup";
import { getHeroById, updateHero } from "../api/heroApi";
import type { Hero } from "../types/Hero";

const schema = yup.object({
  name: yup.string().required("Le nom est obligatoire"),
  publisher: yup.string().required("L’univers est obligatoire"),
});

function EditHero() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hero, setHero] = useState<Hero | null>(null);
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [strength, setStrength] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [combat, setCombat] = useState(50);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHero() {
      if (!id) return;

      const data = await getHeroById(id);
      setHero(data);
      setName(data.name || "");
      setAlias(data.biography?.fullName || "");
      setPublisher(data.biography?.publisher || "");
      setDescription(data.work?.occupation || "");
      setStrength(data.powerstats?.strength || 50);
      setSpeed(data.powerstats?.speed || 50);
      setCombat(data.powerstats?.combat || 50);
    }

    loadHero();
  }, [id]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await schema.validate({ name, publisher });

      const token = localStorage.getItem("token");

      if (!token || !id) {
        alert("Tu dois te connecter");
        navigate("/login");
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("biography[fullName]", alias);
      formData.append("biography[publisher]", publisher);
      formData.append("biography[aliases][0]", alias);
      formData.append("work[occupation]", description);

      formData.append("powerstats[strength]", String(strength));
      formData.append("powerstats[speed]", String(speed));
      formData.append("powerstats[combat]", String(combat));

      if (image) {
        formData.append("image", image);
      }

      await updateHero(id, formData, token);
      navigate(`/hero/${id}`);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la modification");
    }
  }

  if (!hero) return <p className="loading">Chargement...</p>;

  return (
    <main className="form-page">
      <Link to={`/hero/${id}`} className="back-link">← Retour</Link>

      <form className="hero-form" onSubmit={handleSubmit}>
        <h1>Modifier un héros</h1>

        {error && <div className="error-message">{error}</div>}

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du héros" />

        <input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Alias / Nom complet" />

        <select value={publisher} onChange={(e) => setPublisher(e.target.value)}>
          <option value="Marvel Comics">Marvel Comics</option>
          <option value="DC Comics">DC Comics</option>
          <option value="Dark Horse Comics">Dark Horse Comics</option>
          <option value="Autre">Autre</option>
        </select>

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

        <label>Force : {strength}</label>
        <input type="range" min="0" max="100" value={strength} onChange={(e) => setStrength(Number(e.target.value))} />

        <label>Vitesse : {speed}</label>
        <input type="range" min="0" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />

        <label>Combat : {combat}</label>
        <input type="range" min="0" max="100" value={combat} onChange={(e) => setCombat(Number(e.target.value))} />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && <img className="preview-img" src={preview} alt="Aperçu" />}

        <button type="submit">Enregistrer</button>
      </form>
    </main>
  );
}

export default EditHero;