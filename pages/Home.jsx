import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import Searchbar from "../components/Searchbar";
import NoteItem from "../components/NoteItem";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  useDeleteMultipleNotesMutation,
  useFetchNotesQuery,
  useSearchNotesQuery,
} from "../db";
import AddNoteIcon from "@expo/vector-icons/MaterialCommunityIcons";
import TrashIcon from "@expo/vector-icons/FontAwesome5";
import { useTheme } from "../providers/ThemeContext";

const Home = ({ navigation, route }) => {
  useDeviceContext(tw);
  const { theme } = useTheme();

  const [searchString, setSearchString] = useState("");

  const { data: notesData = [] } = useFetchNotesQuery();
  const { data: filteredNotes = [] } = useSearchNotesQuery(searchString);
  const [deleteMultiNote] = useDeleteMultipleNotesMutation();

  const [notes, setNotes] = useState(notesData);

  const [multiSelect, setMultiSelect] = useState(false); // Select multiple notes mode
  const [deleteNotes, setDeleteNotes] = useState([]); // Array of notes to be deleted

  // A method to change the current multiselect notes state
  const changeMultiSelectStatus = () => {
    setMultiSelect((prev) => !prev);
  };

  // A method to change screens
  const changeScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  // A method to delete multiple selected notes
  const deleteMultipleNotes = () => {
    deleteMultiNote(deleteNotes);
    setDeleteNotes([]); // Set the delete notes array to empty after deleting all selected notes.
    changeMultiSelectStatus(); // Change multiselect state back to false.
  };

  // A method to handle the floating action button press.
  const handleFloatingButton = () => {
    // If multiselect mode is true then user is deleting multiple notes, else user is adding a new note.
    if (multiSelect) {
      deleteMultipleNotes();
    } else {
      changeScreen("New Note");
    }
  };

  // Add button to right side of the header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={changeMultiSelectStatus}>
          <Text style={tw`text-[16px] text-blue-600 mr-[12px]`}>
            {multiSelect ? "Cancel" : "Select"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [multiSelect]);

  // A method to filter notes specific to the screen
  const filterNotesByScreen = (notes) => {
    const filtered = notes?.filter((note) => {
      const noteCat = note?.cat.toLowerCase().trim();
      const routeName = route?.name.toLowerCase().trim();

      return noteCat === routeName;
    });

    return filtered;
  };

  // A method to sort the notes.
  const sortNotesByDate = (notes) => {
    let filteredByScreen = notes;

    // If the current screen isn't the "All Notes" screen filter the notes specific to the current screen.
    if (route?.name !== "All Notes") {
      filteredByScreen = filterNotesByScreen(notes);
    }

    // Make sure latest note is on top
    const sortedNotes = [...filteredByScreen]?.sort(
      (note1, note2) => new Date(note2.date) - new Date(note1.date)
    );

    setNotes(sortedNotes || []);
  };

  const filterNotes = (searchString) => {
    setSearchString(searchString);
  };

  // Sort notes by date each time notesData changes.
  useEffect(() => {
    //console.log(notesData);
    if (notesData[0] !== null && notesData[0] !== undefined)
      sortNotesByDate(notesData[0]);
  }, [notesData]);

  // Sort searched notes by date each time search string changes.
  useEffect(() => {
    if (filteredNotes !== null && filteredNotes !== undefined)
      sortNotesByDate(filteredNotes);
  }, [searchString]);

  // Item to render for masonary list component
  const renderItem = ({ item, i }) => (
    <NoteItem
      note={item}
      key={item?.id}
      navigation={navigation}
      multiSelect={multiSelect}
      addNoteToMultiDeleteList={() => setDeleteNotes([...deleteNotes, item])}
      removeNoteFromMultiDeleteList={() =>
        setDeleteNotes(deleteNotes?.filter((note) => note !== item))
      }
    />
  );

  return (
    <View style={tw`flex flex-col gap-y-[12px] p-[12px] h-[100%]`}>
      <Searchbar filterNotes={filterNotes} />

      <MasonryList
        style={tw`w-full h-[100%] gap-x-[8px]`}
        data={notes}
        keyExtractor={(item) => item?.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
      />

      <TouchableOpacity
        onPress={handleFloatingButton}
        style={[
          tw`w-[58px] h-[58px] rounded-full bg-slate-200 absolute z-1000 bottom-[50px] right-[25px] flex justify-center items-center shadow-md`,
          { backgroundColor: theme.colors.text },
        ]}
      >
        {multiSelect ? (
          <TrashIcon name="trash" size={28} style={tw`text-red-600`} />
        ) : (
          <AddNoteIcon
            name="note-plus-outline"
            size={28}
            style={tw`text-blue-600`}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Home;
