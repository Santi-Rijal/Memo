import React, {useState} from 'react';
import {TextInput} from 'react-native';
import tw, {useDeviceContext} from 'twrnc';
import {useTheme} from '@react-navigation/native';

const Searchbar = ({filterNotes}) => {
  useDeviceContext(tw);
  const {colors} = useTheme();

  const [searchValue, setSearchValue] = useState('');

  const handleTextChange = newText => {
    setSearchValue(newText);
    filterNotes(newText);
  };

  return (
    <TextInput
      style={[
        tw`w-[100%] h-[40px] px-[8px] bg-slate-700 rounded-md`,
        {color: colors.text},
        {backgroundColor: colors.card},
      ]}
      placeholder="Search"
      onChangeText={handleTextChange}
      value={searchValue}
    />
  );
};

export default Searchbar;
