import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const fieldLabels = {
  height: "Height",
  mass: "Mass",
  hair_color: "Hair color",
  skin_color: "Skin color",
  eye_color: "Eye color",
  birth_year: "Birth year",
  gender: "Gender",
};

const fieldUnits = {
  height: "cm",
  mass: "kg",
};

const numericFields = ["height", "mass"];
const textFields = ["hair_color", "skin_color", "eye_color", "gender"];

const CharacterCard = ({ character, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState(character);

  if (!character) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Preveri, če je polje numerično in validiraj vnos
    if (numericFields.includes(name)) {
      // Dovoli prazen vnos za brisanje ali samo številke
      if (value === "" || /^\d+$/.test(value)) {
        setEditedCharacter({
          ...editedCharacter,
          [name]: value,
        });
      }
    }
    // Preveri, če je polje tekstovno in validiraj vnos
    else if (textFields.includes(name)) {
      // Dovoli prazen vnos za brisanje ali samo črke, presledke in vezaje
      if (value === "" || /^[a-zA-Z\s-]+$/.test(value)) {
        setEditedCharacter({
          ...editedCharacter,
          [name]: value,
        });
      }
    }
    // Za ostala polja (npr. birth_year) dovoli vse znake
    else {
      setEditedCharacter({
        ...editedCharacter,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    // Preveri prazna polja
    const hasEmptyFields = Object.entries(editedCharacter).some(
      ([key, value]) => {
        return fieldLabels[key] && value.toString().trim() === "";
      }
    );

    if (hasEmptyFields) {
      toast.error("All fields must be filled out!");
      return;
    }

    onSave(editedCharacter);
    toast.success("Character updated!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };

  const formatFieldValue = (key, value) => {
    if (fieldUnits[key] && value) {
      return `${value} ${fieldUnits[key]}`;
    }
    return value;
  };

  return (
    <Card className="w-[300px] h-[500px] flex flex-col border-none justify-end p-4 mt-10 overflow-hidden shadow-[0_0_100px_40px_rgba(253,224,71,0.4)] relative">
      {/* Slika karakterja */}
      <div className="absolute inset-0 z-0">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay za berljivost */}
      <div className="absolute inset-0  bg-opacity-40 z-5"></div>

      {/* Podatki o karakterju */}
      <div className="relative leading-6 font-semibold  text-white text-lg z-10">
        <CardTitle className="text-yellow-300 text-2xl">
          {character.name}
        </CardTitle>
        {Object.entries(fieldLabels).map(([key, label]) => (
          <p key={key}>
            {label}:{" "}
            {isEditing ? (
              <input
                type={numericFields.includes(key) ? "number" : "text"}
                name={key}
                value={editedCharacter[key]}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-yellow-300 text-white"
              />
            ) : (
              formatFieldValue(key, editedCharacter[key])
            )}
          </p>
        ))}
      </div>

      {/* Gumbi za urejanje */}
      <div className="flex flex-row justify-center mt-4 relative z-10">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded ml-2"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 text-black px-4 hover:bg-yellow-500 py-2 rounded"
          >
            Edit
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CharacterCard;
