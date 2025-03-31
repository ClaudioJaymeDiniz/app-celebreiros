import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";


export default function Home() {
    const quandoClicar = () => {
        alert('Botão acionado!')
    }
  return (
    <View className=" flex-1  w-full h-full">
        <View className="bg-white w-full">
        <Image className="mx-auto"
        style={{ width: 360, height: 160, objectFit: "fill" }}
          source={require("../../../assets/images/educomlab.png")} />
          </View>
          <View style={styles.container}>
             <Text style={styles.text}>
             O EducomLab é uma plataforma (EAD – Ensino à Distância) em vídeo aulas e workshops explicativos e exercícios práticos para ajudar aqueles que querem fazer seu canal no youtube, produzir videoclipes, curtas metragens, programas de TV ou até mesmo melhorar seu desempenho dentro da escola. Essa plataforma também é voltada para formação de professores em educomunicação, colaborando assim para o desenvolvimento de estratégias pedagógicas na educação básica.
             </Text>
             </View>
      <View className="mx-auto mb-6 ">
        <Video
          source={require("../../../assets/movie/inscreva.mp4")} // Can be a URL or a local file.
          style={{ width: 360, height: 200 }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          onError={(error) => console.error("Video Error:", error)}
        />
      </View>
      <Button title="Cadastre" onPress={quandoClicar} color="#01263a" />
    </View>
  );
}

{
  /* <View className="bg-slate-800 flex-1  w-full h-full">
      
<View className="bg-slate-400  w-full flex items-center justify-center">
<Video
  source={require("../../../assets/movie/inscreva.mp4")} // Can be a URL or a local file.
  style={{ width: 360, height: 300 }}
  
  resizeMode={ResizeMode.CONTAIN}
  isLooping
  shouldPlay
  onError={(error) => console.error("Video Error:", error)}
/>

</View>
<Text className="bg-blue-200">Home1</Text>
</View> */
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        
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
        textAlign: 'justify',
        
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    }
   
});