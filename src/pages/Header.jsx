import starWarsLogo from "../assets/starWarsLogo.png";

const Header = () => {
  return (
    <>
      <div>
        <img
          src={starWarsLogo}
          className="w-[200px] flex flex-col items-center "
          alt="Star Wars Logo"
        />
        <div className="flex flex-row justify-center gap-x-5   m-5 items-center"></div>
      </div>
    </>
  );
};

export default Header;
