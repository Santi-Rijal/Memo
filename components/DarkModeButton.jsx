import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import MoonIcon from "@expo/vector-icons/Entypo";
import SunIcon from "@expo/vector-icons/Feather";
import { useTheme } from "../providers/ThemeContext";
import tw, { useDeviceContext } from "twrnc";

// Dark mode toggle button
const DarkModeButton = () => {
  useDeviceContext(tw);
  const { theme, isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={tw`p-[20px] border-t-2	border-gray-500`}>
      <TouchableOpacity
        style={[
          tw`w-[100%] h-[40px] bg-gray-300 rounded-full flex flex-row justify-evenly items-center relative`,
          { backgroundColor: theme.colors.text },
        ]}
        onPress={toggleTheme}
      >
        <SunIcon name="sun" style={tw`text-[20px] text-yellow-700`} />
        <MoonIcon name="moon" style={tw`text-[20px] text-gray-300`} />
        <View
          style={[
            tw`w-[50%] h-[36px] rounded-full absolute shadow-md ${
              isDarkTheme ? "right-[2px]" : "left-[2px]"
            }`,
            { backgroundColor: theme.colors.card },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DarkModeButton;
