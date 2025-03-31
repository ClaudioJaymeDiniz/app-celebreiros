// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const questions = [
//     {
//         question: "Por que é importante planejar antes de criar um vídeo?",
//         options: [
//             "Para economizar tempo e recursos",
//             "Para garantir qualidade de som e imagem",
//             "Para que o vídeo tenha um propósito claro",
//             "Todas as anteriores"
//         ],
//         correctAnswer: "Todas as anteriores"
//     },
//     {
//         question: "Qual elemento é mais importante para gerar interesse no público?",
//         options: [
//             "Alta resolução da câmera",
//             "Uma história envolvente",
//             "Efeitos visuais elaborados",
//             "Uso de equipamentos caros"
//         ],
//         correctAnswer: "Uma história envolvente"
//     },
//     {
//         question: "O que é storytelling?",
//         options: [
//             "A técnica de edição de vídeos longos",
//             "A arte de contar histórias para envolver o público",
//             "Um tipo de equipamento de filmagem",
//             "Uma ferramenta para ajustar o áudio de vídeos"
//         ],
//         correctAnswer: "A arte de contar histórias para envolver o público"
//     },
//     {
//         question: "Qual destes NÃO é um benefício de cativar o público?",
//         options: [
//             "Aumentar a audiência",
//             "Tornar seu conteúdo mais memorável",
//             "Tornar o vídeo mais curto",
//             "Criar uma conexão emocional"
//         ],
//         correctAnswer: "Tornar o vídeo mais curto"
//     },
//     {
//         question: "Qual é o principal objetivo ao cativar e incentivar na criação de vídeos?",
//         options: [
//             "Aprender a usar ferramentas avançadas de edição",
//             "Desenvolver habilidades técnicas em captação de som",
//             "Inspirar criatividade e gerar conexão com o público",
//             "Escolher o melhor equipamento para filmagem"
//         ],
//         correctAnswer: "Inspirar criatividade e gerar conexão com o público"
//     }
// ];

// export default function Quiz() {
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [score, setScore] = useState(0);
//     const [showResult, setShowResult] = useState(false);

//     const handleAnswer = (selectedOption: string) => {
//         const currentQuestion = questions[currentQuestionIndex];
//         if (selectedOption === currentQuestion.correctAnswer) {
//             setScore(score + 1);
//         }

//         if (currentQuestionIndex + 1 < questions.length) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         } else {
//             setShowResult(true);
//         }
//     };

//     if (showResult) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.resultText}>Você acertou {score} de {questions.length} perguntas!</Text>
//             </View>
//         );
//     }

//     const currentQuestion = questions[currentQuestionIndex];

//     return (
//         <View style={styles.container}>
//             <Text style={styles.questionText}>{currentQuestion.question}</Text>
//             {currentQuestion.options.map((option, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     style={styles.optionButton}
//                     onPress={() => handleAnswer(option)}
//                 >
//                     <Text style={styles.optionText}>{option}</Text>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     questionText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         textAlign: 'center',
//     },
//     optionButton: {
//         backgroundColor: '#007BFF',
//         padding: 12,
//         borderRadius: 8,
//         marginVertical: 8,
//         width: '100%',
//     },
//     optionText: {
//         color: '#fff',
//         fontSize: 16,
//         textAlign: 'center',
//     },
//     resultText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface QuizProps {
    questions: {
        question: string;
        options: string[];
        correctAnswer: string;
    }[];
}

export default function Quiz({ questions }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (selectedOption: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    if (showResult) {
        return (
            <View style={styles.container}>
                <Text style={styles.resultText}>Você acertou {score} de {questions.length} perguntas!</Text>
            </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => handleAnswer(option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
        width: '100%',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});