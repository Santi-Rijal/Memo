import React from "react";
import tw, { useDeviceContext } from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import Note from "./pages/Note";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeDrawer from "./components/HomeDrawer";

const Stack = createNativeStackNavigator();

function App() {
  useDeviceContext(tw);
  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeDrawer"
            component={HomeDrawer}
            options={{
              title: "",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="New Note"
            component={Note}
            options={{ title: "" }}
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
