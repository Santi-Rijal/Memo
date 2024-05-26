import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import tw, { useDeviceContext } from "twrnc";
import DarkModeButton from "./DarkModeButton";

// Custom drawer items container
const CustomDrawerContent = (props) => {
  useDeviceContext(tw);

  return (
    <SafeAreaView style={tw`flex flex-col justify-between h-[100%]`}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DarkModeButton />
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
