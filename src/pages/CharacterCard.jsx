//*Glavna komponenta, ki prikaže kartico karakterja, omogoča urejanje in shranjevanje podatkov

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import CharacterDetails from "./CharacterDetails";
import CharacterImage from "./CharacterImage";
import CharacterActions from "./CharacterActions";

//  Konstante za polja karakterja
const fieldLabels = {
  height: "Height",
  mass: "Mass",
  hair_color: "Hair color",
  skin_color: "Skin color",
  eye_color: "Eye color",
  birth_year: "Birth year",
  gender: "Gender",
};

const fieldUnits = { height: "cm", mass: "kg" };
const numericFields = ["height", "mass"];
const textFields = ["hair_color", "skin_color", "eye_color", "gender"];

const CharacterCard = ({ character, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState(character || {});
  if (!character) return null; // Če ni podatkov, ne prikažemo ničesar
  //  Upravljanje sprememb v vnosnih poljih
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Nastavimo vrednost le, če ustreza tipu podatkov
    if (
      (numericFields.includes(name) && (value === "" || /^\d+$/.test(value))) ||
      (textFields.includes(name) && /^[a-zA-Z\s-]*$/.test(value)) ||
      (!numericFields.includes(name) && !textFields.includes(name))
    ) {
      setEditedCharacter({ ...editedCharacter, [name]: value });
    }
  };
  //  Shranjevanje sprememb
  const handleSave = () => {
    const isEmpty = Object.entries(fieldLabels).some(
      ([key]) => !editedCharacter[key]?.trim()
    );
    if (isEmpty) {
      toast.error("All fields must be filled out!");
      return;
    }
    onSave(editedCharacter);
    toast.success("Character updated!");
    setIsEditing(false);
  };
  //  Preklic urejanja
  const handleCancel = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };
  // Dodajanje enot k vrednostim
  const formatFieldValue = (key, value) =>
    fieldUnits[key] && value ? `${value} ${fieldUnits[key]}` : value;
  return (
    <Card className="w-[300px] h-[500px] flex flex-col border-none justify-end p-4 mt-10 overflow-hidden shadow-[0_0_100px_40px_rgba(253,224,71,0.4)] relative">
      <CharacterImage imageUrl={character.imageUrl} name={character.name} />
      <CharacterDetails
        character={character}
        isEditing={isEditing}
        editedCharacter={editedCharacter}
        handleChange={handleChange}
        formatFieldValue={formatFieldValue}
        fieldLabels={fieldLabels}
        numericFields={numericFields}
      />
      <CharacterActions
        isEditing={isEditing}
        handleSave={handleSave}
        handleCancel={handleCancel}
        setIsEditing={setIsEditing}
      />
    </Card>
  );
};

export default CharacterCard;
