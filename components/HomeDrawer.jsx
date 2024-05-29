import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import CustomDrawerContent from "./CustomDrawerContent";
import { useFetchFoldersQuery } from "../db";

const Drawer = createDrawerNavigator();

// A drawer nav for home screen
function HomeDrawer() {
  const { data: folderData = [] } = useFetchFoldersQuery();

  console.log("folders", folderData);

  return (
    <Drawer.Navigator
      initialRouteName="All Notes"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="All Notes"
        component={Home}
        options={{
          title: "All Notes",
        }}
      />
      {folderData &&
        folderData[0]
          .map((folder) => (
            <Drawer.Screen
              key={folder.id}
              name={folder}
              component={Home}
              options={{
                title: folder,
              }}
            />
          ))
          .reverse()}
    </Drawer.Navigator>
  );
}

export default HomeDrawer;
