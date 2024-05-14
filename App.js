import React from "react";
import tw, { useDeviceContext } from "twrnc";
import Home from "./pages/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Note from "./pages/Note";
import Menu from "./pages/Menu";
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);
  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Notes",
            }}
          />
          <Stack.Screen
            name="New Note"
            component={Note}
            options={{ title: "" }}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              title: "",
              animation: "slide_from_left",
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="Note"
            component={Note}
            options={{
              title: "",
              headerRight: () => <Button title="Delete" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
