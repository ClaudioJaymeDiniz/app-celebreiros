import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YoutubePlayer from 'react-native-youtube-iframe';

import AulaComents from '../../components/aulas/AulaComents';
import AulaNote from '../../components/aulas/AulaNote';    
import AulaQuiz from '../../components/aulas/AulaQuiz';

const Tab = createMaterialTopTabNavigator();

type LessonParams = {
  LessonScreen: {
    videoId: string;
    title: string;
  };
};

const LessonScreen = () => {
  const route = useRoute<RouteProp<LessonParams, 'LessonScreen'>>();
  const { videoId, title } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>{title}</Text>
      <YoutubePlayer height={200} play={false} videoId={videoId} />
      <Tab.Navigator>
        <Tab.Screen name="Anotações" component={AulaNote} />
        <Tab.Screen name="Comentários" component={AulaComents} />
        <Tab.Screen name="Quiz" component={AulaQuiz} />
      </Tab.Navigator>
    </View>
  );
};

export default LessonScreen;
