//* Ta komponenta prikazuje gumbe za urejanje znakov.
// Če je način urejanja aktiven, prikaže gumbe "Save" in "Cancel",
// sicer prikaže gumb "Edit".

import { Button } from "@/components/ui/button";

const CharacterActions = ({
  isEditing,
  handleSave,
  handleCancel,
  setIsEditing,
}) => {
  //  Definiramo gumbe glede na način urejanja
  const buttons = isEditing
    ? [
        {
          onClick: handleSave,
          text: "Save",
          className: "bg-green-500 hover:bg-green-600 text-white",
        },
        {
          onClick: handleCancel,
          text: "Cancel",
          className: "bg-red-500 hover:bg-red-600 text-white ml-2",
        },
      ]
    : [
        {
          onClick: () => setIsEditing(true),
          text: "Edit",
          className: "bg-yellow-400 hover:bg-yellow-500 text-black",
        },
      ];

  return (
    <div className="flex flex-row justify-center mt-4 relative z-10">
      {buttons.map(({ onClick, text, className }) => (
        <Button
          key={text}
          onClick={onClick}
          className={`${className} px-4 py-2 rounded`}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default CharacterActions;
