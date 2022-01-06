import React, { useState } from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchTerm: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const [timer, setTimer] = useState(setTimeout(() => {}, 0));
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (timer) {
      // Clears timeout every time a new letter is typed.
      clearTimeout(timer);
    }
    setTimer(
      // Sets a new timer such that searchTerm is updated once there's been 1.5 seconds idletime.
      setTimeout(() => {
        setSearchTerm(event.target.value);
      }, 1500)
    );
  };

  return (
    <div className="search-box">
      Search here &nbsp;&nbsp;
      <input
        type="text"
        value={text}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default SearchTerm;
