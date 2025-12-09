import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import Registrar from "../components/RegisterTypes/Registrar";
import Perfil from "../components/MeuperfilTypes/Perfil";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Registrar" component={Registrar} />
      <AppDrawer.Screen name="Meu Perfil" component={Perfil} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;
