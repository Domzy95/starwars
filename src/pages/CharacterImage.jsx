//*komponenta za prikaz slike karakterja
const CharacterImage = ({ imageUrl, name }) => {
  return (
    <div className="absolute inset-0 z-0">
      <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-opacity-40 z-5"></div>
    </div>
  );
};
export default CharacterImage;
