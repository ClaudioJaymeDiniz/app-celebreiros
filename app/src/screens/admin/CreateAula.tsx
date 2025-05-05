import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

interface Questao {
  pergunta: string;
  alternativa_a: string;
  alternativa_b: string;
  alternativa_c: string;
  alternativa_d: string;
  resposta_correta: string;
}

export default function CreateAula() {
  const [titulo, setTitulo] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [questoes, setQuestoes] = useState<Questao[]>([{
    pergunta: '',
    alternativa_a: '',
    alternativa_b: '',
    alternativa_c: '',
    alternativa_d: '',
    resposta_correta: ''
  }]);
  const navigation = useNavigation();
  const { user } = useAuth();

  const adicionarQuestao = () => {
    setQuestoes([...questoes, {
      pergunta: '',
      alternativa_a: '',
      alternativa_b: '',
      alternativa_c: '',
      alternativa_d: '',
      resposta_correta: ''
    }]);
  };

  const atualizarQuestao = (index: number, campo: keyof Questao, valor: string) => {
    const novasQuestoes = [...questoes];
    novasQuestoes[index] = {
      ...novasQuestoes[index],
      [campo]: valor
    };
    setQuestoes(novasQuestoes);
  };

  const handleSubmit = async () => {
    try {
      // Primeiro, criar a aula
      const aulaResponse = await fetch('http://192.168.18.3:8000/api/aulas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('@Celebreiros:token')}`
        },
        body: JSON.stringify({
          titulo,
          video_url: videoUrl
        }),
      });

      if (!aulaResponse.ok) {
        throw new Error('Erro ao criar aula');
      }

      const aulaData = await aulaResponse.json();

      // Depois, criar as questões
      for (const questao of questoes) {
        const questaoResponse = await fetch('http://192.168.18.3:8000/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await AsyncStorage.getItem('@Celebreiros:token')}`
          },
          body: JSON.stringify({
            ...questao,
            aula_id: aulaData.id
          }),
        });

        if (!questaoResponse.ok) {
          throw new Error('Erro ao criar questão');
        }
      }

      Alert.alert('Sucesso', 'Aula criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar aula');
    }
  };

  if (user?.nivel_acesso !== 'admin') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Acesso negado. Apenas administradores podem acessar esta página.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Nova Aula</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título da Aula"
        value={titulo}
        onChangeText={setTitulo}
      />
      
      <TextInput
        style={styles.input}
        placeholder="URL do Vídeo (YouTube)"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />

      <Text style={styles.sectionTitle}>Questões do Quiz</Text>
      
      {questoes.map((questao, index) => (
        <View key={index} style={styles.questaoContainer}>
          <Text style={styles.questaoTitle}>Questão {index + 1}</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Pergunta"
            value={questao.pergunta}
            onChangeText={(text) => atualizarQuestao(index, 'pergunta', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Alternativa A"
            value={questao.alternativa_a}
            onChangeText={(text) => atualizarQuestao(index, 'alternativa_a', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Alternativa B"
            value={questao.alternativa_b}
            onChangeText={(text) => atualizarQuestao(index, 'alternativa_b', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Alternativa C"
            value={questao.alternativa_c}
            onChangeText={(text) => atualizarQuestao(index, 'alternativa_c', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Alternativa D"
            value={questao.alternativa_d}
            onChangeText={(text) => atualizarQuestao(index, 'alternativa_d', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Resposta Correta (A, B, C ou D)"
            value={questao.resposta_correta}
            onChangeText={(text) => atualizarQuestao(index, 'resposta_correta', text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={adicionarQuestao}>
        <Text style={styles.addButtonText}>Adicionar Questão</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Criar Aula</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
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
  addButton: {
    backgroundColor: '#4CAF50',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#01263a',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
}); 