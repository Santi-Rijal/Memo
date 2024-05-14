import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import { useTheme } from "@react-navigation/native";
import UnselectedIcon from "react-native-vector-icons/FontAwesome";
import SelectedIcon from "react-native-vector-icons/FontAwesome";

const NoteItem = ({
  navigation,
  note,
  multiSelect,
  addNoteToMultiDeleteList,
  removeNoteFromMultiDeleteList,
}) => {
  useDeviceContext(tw);
  const { colors } = useTheme();

  const [selected, setSelected] = useState(false);

  const date = new Date(note?.date);

  // A method to handle card selection in multiselect mode. Sets the selected state of this note.
  const handleSelection = () => {
    setSelected((prev) => !prev);
  };

  // Whenever user cancels multiselect mode, set selected state of note to false if it's true.
  useEffect(() => {
    const shouldSetSelectedToFalse = selected && !multiSelect;

    shouldSetSelectedToFalse && setSelected(false);
  }, [multiSelect]);

  //
  useEffect(() => {
    selected ? addNoteToMultiDeleteList() : removeNoteFromMultiDeleteList();
  }, [selected]);

  // A method to handle resposnse to user pressing a note card.
  const handleCardPress = () => {
    // If user is in multiselect mode, than call a function to handle note selection. Else, go to note screen.
    if (multiSelect) {
      handleSelection();
    } else {
      navigation.navigate("Note", { note: note });
    }
  };

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      style={[
        tw`rounded-md w-[49%] p-[12px] flex flex-col gap-y-[4px] ${
          selected ? "opacity-70" : "opacity-100"
        }`,
        { backgroundColor: colors.card },
      ]}
    >
      <View style={tw`relative flex flex-col gap-y-[8px]`}>
        {multiSelect && (
          <View style={tw`absolute w-[100%] flex items-end`}>
            {selected ? (
              <SelectedIcon name="circle" size={16} />
            ) : (
              <UnselectedIcon name="circle-thin" size={16} />
            )}
          </View>
        )}
        <Text style={[tw`text-lg font-semibold`, { color: colors.text }]}>
          {note?.title}
        </Text>
        <Text style={{ color: colors.text }}>{note?.content}</Text>
        <Text
          style={[
            tw`w-[100%] text-right text-[12px] opacity-50`,
            { color: colors.text },
          ]}
        >
          {date.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteItem;
