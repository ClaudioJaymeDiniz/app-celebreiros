// import { useState } from "react";
// import { View, Text, Button } from "react-native";
// import Video from "react-native-video";
// // import movie from '../../../assets/movie/inscreva.mp4';
// import YoutubeIframe from "react-native-youtube-iframe";

// export default function Videos() {
//   const [paused, setPaused] = useState(true); // Control playback state
//   const [muted, setMuted] = useState(false); // Control sound state
//   return (
//     <View className="bg-slate-400 flex-1 items-center justify-center w-full h-full">
//       <Video
//         source={require("../../../assets/movie/inscreva.mp4")} // Can be a URL or a local file.
//         paused={paused} // Control playback
//         muted={muted} // Control sound
//         // style={styles.video}
//         // Other props
//       />
//       <View >
//         <Button
//           title={paused ? "Play" : "Pause"}
//           onPress={() => setPaused(!paused)}
//         />
//         <Button
//           title={muted ? "Unmute" : "Mute"}
//           onPress={() => setMuted(!muted)}
//         />
//       </View>
//     </View>
//   );
// }

{
  /* <YoutubeIframe
   videoId="TflyxM60k88"
   height={180}
   
   
   >


   </YoutubeIframe> */
}


// import React, { useState, useCallback, useRef } from "react";
// import { Button, View, Alert } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";

// export default function App() {
//   const [playing, setPlaying] = useState(false);

//   const onStateChange = useCallback((state: string) => {
//     if (state === "ended") {
//       setPlaying(false);
//       Alert.alert("video has finished playing!");
//     }
//   }, []);

//   const togglePlaying = useCallback(() => {
//     setPlaying((prev) => !prev);
//   }, []);

//   return (
//     <View>
//       <YoutubePlayer
//         height={300}
//         play={playing}
//         videoId={"iee2TATGMyI"}
//         onChangeState={onStateChange}
//       />
//       <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
//     </View>
//   );
// }