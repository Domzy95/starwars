//*Ta komponenta prikazuje podrobnosti o karakterju in omogoča urejanje teh podatkov.

const CharacterDetails = ({
  character,
  isEditing,
  editedCharacter,
  handleChange,
  formatFieldValue,
  fieldLabels,
  numericFields,
}) => {
  return (
    <div className="relative leading-6 font-semibold text-white text-lg z-10">
      {/* Ime karakterja */}
      <h2 className="text-yellow-300 text-2xl">{character.name}</h2>

      {/* Prikaz polj karakterja */}
      {Object.entries(fieldLabels).map(([key, label]) => (
        <p key={key}>
          {label}:{" "}
          {isEditing ? (
            // Če urejamo, prikažemo vnosno polje
            <input
              type={numericFields.includes(key) ? "number" : "text"}
              name={key}
              value={editedCharacter[key] || ""}
              onChange={handleChange}
              className="bg-transparent border-b-2 border-yellow-300 text-white"
            />
          ) : (
            // Če ne urejamo, prikažemo formatirano vrednost
            formatFieldValue(key, editedCharacter[key])
          )}
        </p>
      ))}
    </div>
  );
};

export default CharacterDetails;
