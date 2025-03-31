import React from 'react';
import { View, StyleSheet } from 'react-native';
import Quiz from '@/src/components/Quiz';
import quizData from '@/src/data/quizData';

export default function Perguntas() {
    return (
        <View style={styles.container}>
            <Quiz questions={quizData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});