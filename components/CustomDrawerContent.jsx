import React, { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import tw, { useDeviceContext } from "twrnc";
import DarkModeButton from "./DarkModeButton";
import { useTheme } from "../providers/ThemeContext";
import { useAddFolderMutation } from "../db";

// Custom drawer items container
const CustomDrawerContent = (props) => {
  useDeviceContext(tw);

  const { theme } = useTheme();

  const [enableEdit, setEnableEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState(false);

  const [addFolder] = useAddFolderMutation();

  const editDrawer = () => {
    setEnableEdit((prev) => !prev);
  };

  const handleAddFolder = () => {
    if (folderName) addFolder({ title: folderName });
    setModalVisible((prev) => !prev);
  };

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
        <DrawerItemList {...props} />
        {enableEdit && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible((prev) => !prev)}
            >
              <View style={styles.centeredView}>
                <View
                  style={[
                    tw`shadow-md p-[12px] gap-y-[8px] flex flex-col rounded-md`,
                    { backgroundColor: theme.colors.card },
                  ]}
                >
                  <TextInput
                    style={[
                      tw`border-2 p-[12px] rounded-md`,
                      { borderColor: theme.colors.text },
                      { color: theme.colors.text },
                    ]}
                    placeholder="Folder Name"
                    onChangeText={setFolderName}
                    placeholderTextColor={theme.colors.text}
                  />
                  <View style={tw`flex flex-row gap-x-[8px]`}>
                    <TouchableOpacity
                      style={[
                        tw`rounded-md p-[8px]`,
                        { backgroundColor: theme.colors.text },
                      ]}
                      onPress={() => setModalVisible((prev) => !prev)}
                    >
                      <Text
                        style={[
                          tw`text-center text-[16px] min-w-[30%] h-[18px]`,
                          { color: theme.colors.card },
                        ]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        tw`rounded-md p-[8px]`,
                        { backgroundColor: theme.colors.text },
                      ]}
                      onPress={handleAddFolder}
                    >
                      <Text
                        style={[
                          tw`text-center text-[16px] min-w-[30%] h-[18px]`,
                          { color: theme.colors.card },
                        ]}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={[
                tw`m-[8px] p-[8px] border-2 rounded-md border-dashed`,
                { borderColor: theme.colors.text },
              ]}
              onPress={() => setModalVisible((prev) => !prev)}
            >
              <Text style={[tw`text-center`, { color: theme.colors.text }]}>
                Add Folder
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </DrawerContentScrollView>
      <DarkModeButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomDrawerContent;
