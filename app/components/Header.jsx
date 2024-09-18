"use client";
import { IoIosSearch } from "react-icons/io";

const Header = ({ handleSearch, setLocation }) => {
  return (
    <div className="md:flex justify-between items-center pt-4 text-center">
      <form
        className="flex items-center border-b-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent  placeholder-white"
          onKeyDown={handleSearch}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          type="submit"
          className=" text-white px-4 py-2 outline-none"
          onClick={handleSearch}
        >
          <IoIosSearch />
        </button>
      </form>
      <div>
        <h1 className="text-3xl mt-2">Weather APP</h1>
      </div>
    </div>
  );
};

export default Header;
