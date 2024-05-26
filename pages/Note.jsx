import React, { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw, { useDeviceContext } from "twrnc";
import { useTheme } from "../providers/ThemeContext";
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "../db";
import BackIcon from "@expo/vector-icons//FontAwesome";

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

  const goBack = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleDelete = () => {
    deleteNote(route?.params?.note);
    goBack("Home");
  };

  const handleBack = () => {
    const todaysDate = date.toString();

    if (route?.params?.note) {
      const updatedNote = {
        id: route?.params?.note?.id,
        title: noteTitle,
        content: noteContent,
        date: todaysDate,
      };
      updateNote(updatedNote);
    } else {
      if (noteTitle || noteContent) {
        addNote({
          title: noteTitle,
          content: noteContent,
          date: todaysDate,
        });
      }
    }
    goBack("Home");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handleDelete} title="Delete" />,
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBack}
          style={tw`flex flex-row gap-x-[8px] items-center`}
        >
          <BackIcon name="angle-left" size={28} style={tw`text-blue-600`} />
          <Text style={tw`text-[18px] text-blue-600`}>Notes</Text>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View
      style={tw`flex flex-col gap-y-[8px] p-[12px]`}
      onMagicTap={() => Keyboard.dismiss()}
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
      />
    </View>
  );
};

export default Note;
