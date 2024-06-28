import React, { useEffect, useState } from "react";
import { Button, Keyboard, TextInput, View } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import { useTheme } from "../providers/ThemeContext";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "../db";

const Note = ({ navigation, route }) => {
  useDeviceContext(tw);
  const date = new Date();

  const { theme } = useTheme();

  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [noteTitle, setNoteTitle] = useState(route?.params?.note?.title || "");
  const [noteContent, setNoteContent] = useState(
    route?.params?.note?.content || ""
  );
  const [noteCategory, setNoteCategory] = useState(
    route?.params?.note?.cat || ""
  );

  // Method to change screen
  const changeScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  // Method to handle current note delete
  const handleDelete = () => {
    const note = route?.params?.note; // if there is a not, then its an already existing note and not a new note being created.

    note && deleteNote(note); // if theres a note delete else just go back.
    changeScreen("All Notes");
  };

  // A method to save a new note
  const saveNote = () => {
    const todaysDate = date.toString();

    // If a note is an alredy existing one, modify it, else create a new note.
    if (route?.params?.note) {
      const updatedNote = {
        id: route?.params?.note?.id,
        title: noteTitle,
        cat: noteCategory,
        content: noteContent,
        date: todaysDate,
      };
      updateNote(updatedNote);
    } else {
      if (noteTitle || noteContent) {
        addNote({
          title: noteTitle,
          cat: noteCategory,
          content: noteContent,
          date: todaysDate,
        });
      }
    }
  };

  // Add a back button and delete button to header.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleDelete} title="Delete" />,
    });
  });

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      saveNote();
    });
  }, [navigation, noteTitle, noteContent, noteCategory]);

  return (
    <View
      style={tw`flex flex-col gap-y-[12px] p-[12px] ${
        Keyboard.isVisible && "h-[48%]"
      }`}
    >
      <TextInput
        style={[
          tw`text-lg bg-transparent font-semibold`,
          { color: theme.colors.text },
        ]}
        onChangeText={setNoteTitle}
        value={noteTitle}
        underlineColor="transparent"
        placeholder="Title"
        placeholderTextColor={theme.colors.text}
      />
      <TextInput
        style={[tw`bg-transparent italic`, { color: theme.colors.text }]}
        onChangeText={setNoteCategory}
        value={noteCategory}
        underlineColor="transparent"
        placeholder="Category"
        placeholderTextColor={theme.colors.text}
      />
      <TextInput
        multiline={true}
        numberOfLines={4}
        onChangeText={setNoteContent}
        style={[tw`bg-transparent`, { color: theme.colors.text }]}
        value={noteContent}
        underlineColor="transparent"
        autoFocus={true}
        placeholder="Content..."
        autoCorrect={true}
        scrollEnabled
        placeholderTextColor={theme.colors.text}
      />
    </View>
  );
};

export default Note;
