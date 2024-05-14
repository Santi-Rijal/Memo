import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MenuItem from "../components/MenuItem";
import tw, { useDeviceContext } from "twrnc";

const menuItems = [
  {
    itemText: "My Notes",
    navigateTo: "Home",
  },
  {
    itemText: "Trash",
    navigateTo: "Trash",
  },
];

const Menu = ({ navigation }) => {
  useDeviceContext(tw);

  return (
    <SafeAreaView style={tw`flex flex-col gap-y-[8px] p-[12px] h-[100vh]`}>
      {menuItems.map((item) => (
        <MenuItem item={item} navigation={navigation} key={item?.itemText} />
      ))}
    </SafeAreaView>
  );
};

export default Menu;
