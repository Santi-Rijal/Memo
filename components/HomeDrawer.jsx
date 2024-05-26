import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Notes",
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;
