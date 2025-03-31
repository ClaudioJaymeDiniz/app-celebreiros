import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// import { View, Text } from "react-native";
import "../../styles/global.css";
import React from "react";
import Home from "./home";
// import Videos from "./videos";
import Sobre from "./sobre";
import Newpage from "./nova";
import Aulat from "./aulat";

export default function App() {
  const Drawer = createDrawerNavigator();

  function tela(props: {
    nome: string;
    icone: string;
    titulo: string;
    componente: any;
  }) {
    return (
      <Drawer.Screen
        name={props.nome}
        component={props.componente}
        options={{
          drawerIcon: ({ focused }: any) => (
            <Ionicons
              name={props.icone as any}
              size={24}
              color={focused ? "#1C80FF" : "#000"}
            />
          ),
          drawerLabel: props.titulo,
          title: props.titulo,
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {tela({
          nome: "Inicio",
          icone: "home-outline",
          titulo: "Início",
          componente: Home,
        })}

        {/* {tela({
          nome: "Video",
          icone: "home-outline",
          titulo: "Video",
          componente: Videos,
        })} */}
        {tela({
          nome: "Sobre o Curso",
          icone: "",
          titulo: "Sobre o Curso",
          componente: Sobre,
        })}

{tela({
          nome: "Nova",
          icone: "",
          titulo: "Aula 1",
          componente: Newpage,
        })}

{tela({
          nome: "Aula 2",
          icone: "",
          titulo: "Aula 2",
          componente: Aulat,
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
