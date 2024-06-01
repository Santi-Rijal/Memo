import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import DarkModeButton from "./DarkModeButton";
import { useTheme } from "../providers/ThemeContext";
import AddFolderModal from "./AddFolderModal";
import CustomDrawerItem from "./CustomDrawerItem";

// Custom drawer items container
const CustomDrawerContent = ({ folderData, ...props }) => {
  useDeviceContext(tw);

  const { theme } = useTheme();

  const [enableEdit, setEnableEdit] = useState(false);

  const isDrawerOpen = useDrawerStatus() === "open";

  // A method to set the current state of user editing the drawer nav.
  const editDrawer = () => {
    setEnableEdit((prev) => !prev);
  };

  // When user exit out of the drawer nav, if they were previously in edit mode set it to flase.
  useEffect(() => {
    if (!isDrawerOpen) setEnableEdit(false);
  });

  return (
    <SafeAreaView
      style={[
        tw`flex flex-col justify-between h-[100%]`,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <TouchableOpacity onPress={editDrawer}>
        <Text
          style={tw`text-[16px] text-blue-600 text-right pr-[12px] pt-[12px]`}
        >
          {enableEdit ? "Cancel" : "Edit"}
        </Text>
      </TouchableOpacity>
      <DrawerContentScrollView {...props}>
        {props?.state?.routes?.map((route, i) => (
          <CustomDrawerItem
            key={route?.key}
            name={route?.name}
            index={i}
            navigation={props.navigation}
            state={props.state}
            enableEdit={enableEdit}
            folderData={folderData}
          />
        ))}
        {enableEdit && <AddFolderModal />}
      </DrawerContentScrollView>
      <DarkModeButton />
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
