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

const Home = ({ navigation }) => {
  useDeviceContext(tw);
  const { theme } = useTheme();

  const { data: notesData = [], refetch: getNotes } = useFetchNotesQuery();
  const { data: filteredNotes, refetch: searchNotes } = useSearchNotesQuery("");
  const [deleteNote] = useDeleteMultipleNotesMutation();

  const [notes, setNotes] = useState(notesData);

  const [multiSelect, setMultiSelect] = useState(false); // Select multiple notes mode
  const [deleteNotes, setDeleteNotes] = useState([]); // Array of notes to be deleted

  const changeMultiSelectStatus = () => {
    setMultiSelect((prev) => !prev);
  };

  const changeScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const deleteMultipleNotes = () => {
    deleteNote(deleteNotes);
    setDeleteNotes([]);
    changeMultiSelectStatus();
  };

  const handleFloatingButton = () => {
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
            {multiSelect ? "Calcel" : "Select"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [multiSelect]);

  // A method to sort the notes by the date they were created/modified. With latest being at the end.
  const sortNotesByDate = (notes) => {
    const sortedNotes = [...notes].sort(
      (note1, note2) => new Date(note1.date) - new Date(note2.date)
    );

    setNotes(sortedNotes || []);
  };

  const filterNotes = (filterText) => {
    if (filterText === "") {
      sortNotesByDate(notesData[0]);
      return;
    }

    const string = filterText.toLocaleLowerCase();

    const filteredArray = notes?.filter((note) => {
      const { title, content } = note;

      return (
        title.toLocaleLowerCase().includes(string) ||
        content.toLocaleLowerCase().includes(string)
      );
    });

    sortNotesByDate(filteredArray);
  };

  // Fetch notes.
  useEffect(() => {
    const fetchNotes = async () => {
      await getNotes();

      sortNotesByDate(notesData[0]);
    };

    fetchNotes();
  }, [notesData]);

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
    <View style={tw`flex flex-col gap-y-[12px] p-[12px] h-screen`}>
      <Searchbar filterNotes={filterNotes} />

      <MasonryList
        style={tw`w-full h-screen gap-x-[8px]`}
        data={notes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
      />

      <TouchableOpacity
        onPress={handleFloatingButton}
        style={[
          tw`w-[58px] h-[58px] rounded-full bg-slate-200 absolute z-1000 bottom-[120px] right-[20px] flex justify-center items-center shadow-md`,
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
