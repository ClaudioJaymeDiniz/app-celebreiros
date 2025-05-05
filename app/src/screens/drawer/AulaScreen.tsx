import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import YouTube from 'react-native-youtube-iframe';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Aula {
  id: number;
  titulo: string;
  video_url: string;
  questoes: Questao[];
}

interface Questao {
  id: number;
  pergunta: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  resposta_correta: string;
}

export default function AulaScreen() {
  const [aula, setAula] = useState<Aula | null>(null);
  const [activeTab, setActiveTab] = useState<'video' | 'quiz' | 'anotacoes' | 'comentarios'>('video');
  const route = useRoute();
  const { aulaId } = route.params as { aulaId: number };

  useEffect(() => {
    carregarAula();
  }, [aulaId]);

  const carregarAula = async () => {
    try {
      const response = await fetch(`http://192.168.18.3:8000/api/aulas/${aulaId}`, {
        headers: {
          'Authorization': `Bearer ${await AsyncStorage.getItem('@Celebreiros:token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAula(data);
      }
    } catch (error) {
      console.error('Erro ao carregar aula:', error);
    }
  };

  if (!aula) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const renderVideo = () => (
    <View style={styles.videoContainer}>
      <YouTube
        videoId={aula.video_url.split('v=')[1]}
        height={220}
        play={false}
      />
    </View>
  );

  const renderQuiz = () => (
    <ScrollView style={styles.quizContainer}>
      {aula.questoes.map((questao, index) => (
        <View key={questao.id} style={styles.questaoContainer}>
          <Text style={styles.questaoTitle}>Questão {index + 1}</Text>
          <Text style={styles.questaoText}>{questao.pergunta}</Text>
          
          <TouchableOpacity style={styles.alternativaButton}>
            <Text style={styles.alternativaText}>A) {questao.alternativa_a}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.alternativaButton}>
            <Text style={styles.alternativaText}>B) {questao.alternativa_b}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.alternativaButton}>
            <Text style={styles.alternativaText}>C) {questao.alternativa_c}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.alternativaButton}>
            <Text style={styles.alternativaText}>D) {questao.alternativa_d}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderAnotacoes = () => (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Funcionalidade de anotações em desenvolvimento</Text>
    </View>
  );

  const renderComentarios = () => (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Funcionalidade de comentários em desenvolvimento</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{aula.titulo}</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'video' && styles.activeTab]} 
          onPress={() => setActiveTab('video')}
        >
          <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>Vídeo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'quiz' && styles.activeTab]} 
          onPress={() => setActiveTab('quiz')}
        >
          <Text style={[styles.tabText, activeTab === 'quiz' && styles.activeTabText]}>Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'anotacoes' && styles.activeTab]} 
          onPress={() => setActiveTab('anotacoes')}
        >
          <Text style={[styles.tabText, activeTab === 'anotacoes' && styles.activeTabText]}>Anotações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'comentarios' && styles.activeTab]} 
          onPress={() => setActiveTab('comentarios')}
        >
          <Text style={[styles.tabText, activeTab === 'comentarios' && styles.activeTabText]}>Comentários</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'video' && renderVideo()}
      {activeTab === 'quiz' && renderQuiz()}
      {activeTab === 'anotacoes' && renderAnotacoes()}
      {activeTab === 'comentarios' && renderComentarios()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#01263a',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#01263a',
    fontWeight: 'bold',
  },
  videoContainer: {
    marginTop: 20,
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  questaoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  questaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questaoText: {
    fontSize: 16,
    marginBottom: 15,
  },
  alternativaButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  alternativaText: {
    fontSize: 16,
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
}); 