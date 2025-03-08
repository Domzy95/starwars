import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useStarWarsCharacters = (charactersList) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API klic in shranjevanje v state + localStorage
  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        charactersList.map((char) => axios.get(char.url))
      );

      const updatedCharacters = responses.map((response, index) => ({
        ...response.data,
        imageUrl: charactersList[index].imageUrl,
      }));

      setCharacters(updatedCharacters);
      localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    } catch (error) {
      console.error("Error loading characters:", error);
      setError("Failed to load characters. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [charactersList]);

  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");

    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
      setLoading(false);
    } else {
      fetchCharacters();
    }
  }, [fetchCharacters]);

  // Funkcija za posodabljanje posameznega lika
  const updateCharacter = (updatedCharacter) => {
    const updatedCharacters = characters.map((char) =>
      char.name === updatedCharacter.name ? updatedCharacter : char
    );

    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  };

  return { characters, loading, error, updateCharacter };
};

export default useStarWarsCharacters;
