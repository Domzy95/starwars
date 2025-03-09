import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * Custom React hook za pridobivanje podatkov o Star Wars likih.
 * @param {Array} charactersList - Seznam likov z `url` za API klic in `imageUrl` za slike.
 * @returns {Object} - Vrača stanje likov, status nalaganja, morebitno napako in funkcijo za posodobitev likov.
 */
const useStarWarsCharacters = (charactersList) => {
  // Inicializiramo stanje iz `localStorage`, če podatki že obstajajo, sicer prazen array
  const [characters, setCharacters] = useState(
    JSON.parse(localStorage.getItem("characters")) || []
  );
  // Če so podatki že v `localStorage`, ni potrebe po nalaganju
  const [loading, setLoading] = useState(!characters.length);
  const [error, setError] = useState(null);

  /**
   * Funkcija za pridobivanje podatkov o likih iz API-ja.
   * Uporablja `useCallback`, da se ne ustvari nova funkcija ob vsakem renderju.
   */
  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      // Hkrati pošljemo zahteve za vse like
      const responses = await Promise.all(
        charactersList.map(({ url }) => axios.get(url))
      );

      // Združimo podatke iz API-ja z dodatnimi podatki (npr. imageUrl)
      const updatedCharacters = responses.map((res, i) => ({
        ...res.data,
        imageUrl: charactersList[i].imageUrl,
      }));

      // Posodobimo state in shranimo podatke v `localStorage`
      setCharacters(updatedCharacters);
      localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    } catch {
      setError("Failed to load characters. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [charactersList]);

  /**
   * Ob prvi montaži komponente preverimo, ali so podatki že shranjeni.
   * Če niso, jih naložimo iz API-ja.
   */
  useEffect(() => {
    if (!characters.length) fetchCharacters();
  }, [fetchCharacters, characters.length]);

  /**
   * Funkcija za posodobitev enega lika v stanju in `localStorage`.
   * @param {Object} updatedCharacter - Posodobljen lik z novimi podatki.
   */
  const updateCharacter = (updatedCharacter) => {
    const updatedCharacters = characters.map((char) =>
      char.name === updatedCharacter.name ? updatedCharacter : char
    );

    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  };

  // Vračamo stanje likov, indikator nalaganja, napako in funkcijo za posodobitev lika
  return { characters, loading, error, updateCharacter };
};

export default useStarWarsCharacters;
