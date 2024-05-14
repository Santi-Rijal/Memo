import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import tw, { useDeviceContext } from "twrnc";

const MenuItem = ({ navigation, item }) => {
  useDeviceContext(tw);
  const { colors } = useTheme();

  const handleMenuItemPress = () => {
    navigation.navigate(item?.navigateTo);
  };

  return (
    <TouchableOpacity onPress={handleMenuItemPress}>
      <Text
        style={[tw`text-[16px] p-[12px]`, { backgroundColor: colors.card }]}
      >
        {item?.itemText}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
