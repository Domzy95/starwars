import Header from "./pages/Header";
import CharacterCard from "./pages/CharacterCard";
import useStarWarsCharacters from "./hooks/useStarWarsCharacters"; // Uvozimo custom hook

import yodaImg from "./assets/yoda.png";
import vaderImg from "./assets/darthvader.png";
import obiwanImg from "./assets/obiwan.png";

// Seznam likov in njihovih API URL-jev
const charactersList = [
  { name: "Yoda", url: "https://swapi.dev/api/people/20/", imageUrl: yodaImg },
  {
    name: "Darth Vader",
    url: "https://swapi.dev/api/people/4/",
    imageUrl: vaderImg,
  },
  {
    name: "Obi-Wan Kenobi",
    url: "https://swapi.dev/api/people/10/",
    imageUrl: obiwanImg,
  },
];

function App() {
  // Uporabimo custom hook
  const { characters, loading, error, updateCharacter } =
    useStarWarsCharacters(charactersList);

  if (loading)
    return (
      <div className="flex justify-center text-4xl items-center min-h-screen bg-black text-yellow-300">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-black min-h-screen">
      <Header />
      <div className="flex flex-wrap justify-center gap-5 m-10">
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            onSave={updateCharacter} // Posredujemo update funkcijo
          />
        ))}
      </div>
    </div>
  );
}

export default App;
