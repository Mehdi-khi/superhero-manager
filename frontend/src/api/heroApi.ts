import axios from "axios";

const API_URL = "http://localhost:5000/api/heroes";

export async function getHeroes() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getHeroById(id: string) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createHero(formData: FormData, token: string) {
  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function updateHero(id: string, formData: FormData, token: string) {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deleteHero(id: string, token: string) {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}