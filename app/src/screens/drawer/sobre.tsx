import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function Sobre() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Vídeo do YouTube */}
            <View style={styles.videoContainer}>
            <YoutubePlayer
                height={300}
                videoId={"TflyxM60k88"}
       
      />
            </View>

            {/* Informações do curso */}
            <View style={styles.section}>
                <Text style={styles.title}>Informações do Curso</Text>
                <Text style={styles.titlemax}>
                    Audiovisual: Da Ideia à Exibição
                </Text>
            </View>

            {/* Sobre o curso */}
            <View style={styles.section}>
                <Text style={styles.title}>Sobre o Curso</Text>
                <Text style={styles.text}>
                    Este curso de audiovisual online é voltado para iniciantes que desejam aprender as bases da produção de vídeos de forma prática e acessível. Com uma abordagem dinâmica, você será guiado por todas as etapas da criação audiovisual, desde o incentivo à criatividade até a exibição do seu projeto final. Não é necessário ter experiência prévia, apenas o desejo de explorar sua criatividade e contar suas histórias por meio do vídeo.
                </Text>
            </View>

            {/* Objetivos do curso */}
            <View style={styles.section}>
                <Text style={styles.title}>Objetivos do Curso</Text>
                <Text style={styles.text}>
                    - Desenvolver habilidades básicas de produção audiovisual;{'\n'}
                    - Motivar os alunos a criar e compartilhar suas próprias histórias;{'\n'}
                    - Fornecer conhecimentos práticos de roteiro, captação, edição e exibição de vídeos.
                </Text>
            </View>

            {/* Público-Alvo */}
            <View style={styles.section}>
                <Text style={styles.title}>Público-Alvo</Text>
                <Text style={styles.text}>
                    Qualquer pessoa interessada em explorar o universo audiovisual, desde criadores de conteúdo iniciante até educadores, empreendedores e curiosos que desejam aprender a produzir vídeos de qualidade.
                </Text>
            </View>

            {/* Duração */}
            <View style={styles.section}>
                <Text style={styles.title}>Duração</Text>
                <Text style={styles.text}>
                    Curso dividido em 7 aulas, com carga horária total aproximada de 20 horas.
                </Text>
            </View>

            <Text style={styles.footer}>
                Entre no mundo do audiovisual e comece a contar suas histórias hoje mesmo!
            </Text>
        </ScrollView>
    );
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
    section: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    footer: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
    },
    titlemax: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
});