import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import Register from "./register";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 w-full h-full">
      <View className="bg-white w-full">
        <Image
          className="mx-auto"
          style={{ width: 360, height: 160, objectFit: "fill" }}
          source={require("../../../assets/images/educomlab.png")}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          O EducomLab é uma plataforma (EAD – Ensino à Distância) em vídeo aulas e
          workshops explicativos e exercícios práticos para ajudar aqueles que
          querem fazer seu canal no youtube, produzir videoclipes, curtas
          metragens, programas de TV ou até mesmo melhorar seu desempenho dentro
          da escola. Essa plataforma também é voltada para formação de professores
          em educomunicação, colaborando assim para o desenvolvimento de
          estratégias pedagógicas na educação básica.
        </Text>
      </View>
      <View className="mx-auto mb-6">
        <Video
          source={require("../../../assets/movie/inscreva.mp4")}
          style={{ width: 360, height: 200 }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          onError={(error) => console.error("Video Error:", error)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register' as never)}
      >
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  videoContainer: {
    height: 160,
    marginBottom: 16,
  },
  video: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "justify",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#01263a",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});