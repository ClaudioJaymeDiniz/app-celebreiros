import Anotacao from '@/src/components/Anotacao';
import Comentario from '@/src/components/Comentario';
import Perguntas from '@/src/components/Perguntas';
import Quiz from '@/src/components/Quiz';
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function NewPage() {
    const [activeTab, setActiveTab] = useState('Tab 1');

    const renderContent = () => {
        switch (activeTab) {
            case 'Tab 1':
                return <Anotacao />;
            case 'Tab 2': 
                return <Comentario  />
            case 'Tab 3':
                // return <Quiz questions={[0]} />;
                return <Perguntas />
            default:
                return <Anotacao />;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Vídeo do YouTube */}
            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={300}
                    videoId={"Kaw-IN9c7pk"}
                />
            </View>
            <View>
                        <Text >
                        Descubra como despertar sua criatividade e encontrar inspiração para criar vídeos que cativem o público. Técnicas de storytelling, motivação e planejamento para seus primeiros projetos audiovisuais.      
                        </Text>
                        </View>
            
            

            {/* Botões de navegação */}
            <View style={styles.buttonContainer}>
                <Button title="Anotações" onPress={() => setActiveTab('Tab 1')} />
                <Button title="Comentarios" onPress={() => setActiveTab('Tab 2')} />
                <Button title="Quiz" onPress={() => setActiveTab('Tab 3')} />
            </View>

            {/* Conteúdo da Tab */}
            <View style={styles.contentContainer}>
                {renderContent()}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    videoContainer: {
        height: 204,
        marginBottom: 16,
    
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    contentContainer: {
        marginTop: 16,
    },
    tabContent: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
    },

});