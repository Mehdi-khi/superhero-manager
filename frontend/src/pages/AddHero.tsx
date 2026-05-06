import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { createHero } from "../api/heroApi";

const schema = yup.object({
  name: yup.string().required("Le nom est obligatoire"),
  publisher: yup.string().required("L’univers est obligatoire"),
});

function AddHero() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [publisher, setPublisher] = useState("Marvel Comics");
  const [description, setDescription] = useState("");
  const [strength, setStrength] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [combat, setCombat] = useState(50);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

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

      if (!token) {
        alert("Tu dois te connecter");
        navigate("/login");
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", name.toLowerCase().replaceAll(" ", "-"));
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

      await createHero(formData, token);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l’ajout");
    }
  }

  return (
    <main className="form-page">
      <Link to="/dashboard" className="back-link">← Retour</Link>

      <form className="hero-form" onSubmit={handleSubmit}>
        <h1>Ajouter un héros</h1>

        {error && <div className="error-message">{error}</div>}

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du héros" />

        <input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Alias / Nom complet" />

        <select value={publisher} onChange={(e) => setPublisher(e.target.value)}>
          <option value="Marvel Comics">Marvel Comics</option>
          <option value="DC Comics">DC Comics</option>
          <option value="Dark Horse Comics">Dark Horse Comics</option>
          <option value="Autre">Autre</option>
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label>Force : {strength}</label>
        <input type="range" min="0" max="100" value={strength} onChange={(e) => setStrength(Number(e.target.value))} />

        <label>Vitesse : {speed}</label>
        <input type="range" min="0" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />

        <label>Combat : {combat}</label>
        <input type="range" min="0" max="100" value={combat} onChange={(e) => setCombat(Number(e.target.value))} />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && <img className="preview-img" src={preview} alt="Aperçu" />}

        <button type="submit">Ajouter</button>
      </form>
    </main>
  );
}

export default AddHero;