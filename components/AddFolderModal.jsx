import React, { useState } from "react";
import { Modal, TouchableOpacity, Text, TextInput, View } from "react-native";
import { useAddFolderMutation } from "../db";
import tw, { useDeviceContext } from "twrnc";
import { useTheme } from "../providers/ThemeContext";

const AddFolderModal = () => {
  useDeviceContext(tw);
  const { theme } = useTheme();

  const [folderName, setFolderName] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [addFolder] = useAddFolderMutation();

  const handleAddFolder = () => {
    if (folderName) addFolder({ title: folderName });
    setModalVisible((prev) => !prev);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible((prev) => !prev)}
      >
        <View style={tw`flex-1 justify-center items-center`}>
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
  );
};

export default AddFolderModal;
