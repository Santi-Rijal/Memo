import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { useTheme } from "@react-navigation/native";
import MenuIcon from "@expo/vector-icons/Feather";

const Home = ({ navigation }) => {
  useDeviceContext(tw);
  const { colors } = useTheme();

  const { data: notesData, refetch: GetNotes } = useFetchNotesQuery();
  const { date: filteredNotes, refetch: SearchNotes } = useSearchNotesQuery("");
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
          <Text style={tw`text-[16px] text-blue-500`}>
            {multiSelect ? "Calcel" : "Select"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [multiSelect]);

  // Add button to right side of the header
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => changeScreen("Menu")}>
          <MenuIcon name="menu" size={28} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const filterNotes = (filterText) => {
    // SearchNotes(filterText);
    // setNotes(filteredNotes);

    if (filterText === "") {
      setNotes(notesData[0]);
      return;
    }

    const filteredArray = notes?.filter(
      (note) =>
        note.title
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase()) ||
        note.content
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase())
    );

    setNotes(filteredArray);
  };

  // Fetch notes.
  useEffect(() => {
    const fetchNotes = async () => {
      await GetNotes();

      const sortedNotes = [...notesData[0]].sort(
        (note1, note2) => new Date(note1.date) - new Date(note2.date)
      );

      setNotes(sortedNotes || []);
    };

    fetchNotes();
  }, [navigation, notesData]);

  return (
    <View style={tw`flex flex-col gap-y-[12px] p-[12px]`}>
      <Searchbar filterNotes={filterNotes} />

      <ScrollView
        contentContainerStyle={tw`flex flex-row flex-wrap gap-[4px] min-h-[100%]`}
      >
        {notes?.map((note) => (
          <NoteItem
            note={note}
            key={note?.id}
            navigation={navigation}
            multiSelect={multiSelect}
            addNoteToMultiDeleteList={() =>
              setDeleteNotes([...deleteNotes, note])
            }
            removeNoteFromMultiDeleteList={() =>
              setDeleteNotes(deleteNotes?.filter((item) => item !== note))
            }
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleFloatingButton}
        style={[
          tw`w-[58px] h-[58px] rounded-full bg-slate-200 absolute bottom-[80px] right-[24px] flex justify-center items-center shadow-md`,
          { backgroundColor: colors.text },
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
