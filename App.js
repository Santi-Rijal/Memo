import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Note from "./pages/Note";
import { Provider } from "react-redux";
import { store } from "./store";
import HomeDrawer from "./components/HomeDrawer";
import { ThemeProvider, useTheme } from "./providers/ThemeContext";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </Provider>
  );
}

function AppInner() {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
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
  );
}

export default App;
