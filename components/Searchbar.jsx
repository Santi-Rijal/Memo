import React, { useState } from "react";
import { TextInput } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import { useTheme } from "../providers/ThemeContext";

// Search bar
const Searchbar = ({ filterNotes }) => {
  useDeviceContext(tw);
  const { theme } = useTheme();

  const [searchValue, setSearchValue] = useState("");

  // A method to handle search input
  const handleTextChange = (newText) => {
    setSearchValue(newText);
    filterNotes(newText);
  };

  return (
    <TextInput
      style={[
        tw`w-[100%] h-[40px] px-[8px] bg-slate-700 rounded-md shadow-sm`,
        { color: theme.colors.text },
        { backgroundColor: theme.colors.card },
      ]}
      placeholder="Search"
      onChangeText={handleTextChange}
      value={searchValue}
    />
  );
};

export default Searchbar;
