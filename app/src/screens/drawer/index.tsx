import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import "../../styles/global.css";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Home from "./home";
import Sobre from "./sobre";
import AulaScreen from "./AulaScreen";
import CreateAula from "../admin/CreateAula";
import { useAuth } from "../../contexts/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

interface Aula {
  id: number;
  titulo: string;
}

function CustomDrawerContent(props: any) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={styles.drawerContent}>
      <View style={styles.userSection}>
        <Text style={styles.userName}>{user?.nome || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>

      <View>
        {props.state.routes.map((route: any, index: number) => {
          const focused = index === props.state.index;
          const { drawerLabel, drawerIcon } = props.descriptors[route.key].options;

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.drawerItem, focused && styles.drawerItemFocused]}
              onPress={() => props.navigation.navigate(route.name)}
            >
              {drawerIcon && drawerIcon({ focused })}
              <Text style={[styles.drawerLabel, focused && styles.drawerLabelFocused]}>
                {drawerLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

function tela(props: {
  nome: string;
  icone: string;
  titulo: string;
  componente: any;
  params?: any;
}) {
  return (
    <Drawer.Screen
      name={props.nome}
      component={props.componente}
      initialParams={props.params}
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

export function DrawerNavigator() {
  const { user } = useAuth();
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAulas();
  }, []);

  const carregarAulas = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@Celebreiros:token');
      const response = await fetch('http://192.168.18.3:8000/api/aulas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAulas(data);
      }
    } catch (error) {
      console.error('Erro ao carregar aulas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#01263a" />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#01263a',
        },
        headerTintColor: '#fff',
      }}
    >
      {tela({
        nome: "Inicio",
        icone: "home-outline",
        titulo: "Início",
        componente: Home,
      })}

      {tela({
        nome: "Sobre o Curso",
        icone: "information-circle-outline",
        titulo: "Sobre o Curso",
        componente: Sobre,
      })}

      {aulas.map((aula) => tela({
        nome: `Aula${aula.id}`,
        icone: "book-outline",
        titulo: aula.titulo,
        componente: AulaScreen,
        params: { aulaId: aula.id }
      }))}

      {(user as any)?.nivel_acesso === 'admin' && tela({
        nome: "CreateAula",
        icone: "add-circle-outline",
        titulo: "Criar Nova Aula",
        componente: CreateAula,
      })}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  drawerItemFocused: {
    backgroundColor: '#e3f2fd',
  },
  drawerLabel: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  drawerLabelFocused: {
    color: '#1C80FF',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF3B30',
  },
});