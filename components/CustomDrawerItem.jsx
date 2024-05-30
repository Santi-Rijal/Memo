import { CommonActions, DrawerActions } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import { useTheme } from "../providers/ThemeContext";
import DeleteIcon from "@expo/vector-icons/Feather";
import { useDeleteFolderMutation } from "../db";

const CustomDrawerItem = ({
  name,
  index,
  navigation,
  state,
  enableEdit,
  folderData,
}) => {
  useDeviceContext(tw);
  const { theme } = useTheme();

  const focused = index === state.index;

  const [deleteFolder] = useDeleteFolderMutation();

  // Code from DrawerItemList in @react-navigation/drawer
  const handleDrawerItemPress = () => {
    if (enableEdit) return;

    navigation.dispatch({
      ...(focused
        ? DrawerActions.closeDrawer()
        : CommonActions.navigate({ name: name, merge: true })),
      target: state.key,
    });
  };

  // A method to delete user created folders
  const handleFolderDelete = () => {
    const folder = folderData[0].find((folder) => folder.title === name);
    deleteFolder(folder);
  };

  return (
    <TouchableOpacity
      onPress={handleDrawerItemPress}
      style={[
        tw`flex flex-row justify-between p-[12px] rounded-md mx-[12px] ${
          focused && "bg-blue-100"
        }`,
      ]}
    >
      <Text
        style={[
          tw`text-[14px] font-semibold`,
          focused
            ? { color: theme.colors.primary }
            : { color: theme.colors.text, opacity: 0.6 },
        ]}
      >
        {name}
      </Text>
      {enableEdit && index !== 0 && (
        <TouchableOpacity onPress={handleFolderDelete}>
          <DeleteIcon name="x" style={[tw`text-[16px] text-red-600`]} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default CustomDrawerItem;
