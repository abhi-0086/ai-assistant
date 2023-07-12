import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFaceData(ChatFaceData[0]);
  }, []);

  const onChatFacePress = (id) => {
    //set new selected chat face data
    setSelectedChatFaceData(chatFaceData[id - 1]);
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20, paddingTop: 80 }}>
      <Text style={[{ color: selectedChatFaceData.primary }, { fontSize: 30 }]}>
        Hello
      </Text>
      <Text
        style={[
          { color: selectedChatFaceData.primary },
          { fontSize: 30, fontWeight: "bold" },
        ]}
      >
        I am {selectedChatFaceData.name}
      </Text>
      <Image
        source={{ uri: selectedChatFaceData.image }}
        style={{ width: 150, height: 150, marginTop: 25 }}
      />

      <Text style={{ marginTop: 30, fontSize: 30 }}>How can I help you ?</Text>

      <View
        style={{
          marginTop: 30,
          backgroundColor: "#e8e8e8",
          alignItems: "center",
          height: 120,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            selectedChatFaceData.id != item.id && (
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => onChatFacePress(item.id)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 40, height: 40, marginHorizontal: 15 }}
                />
              </TouchableOpacity>
            )
          }
        />

        <Text style={{ marginTop: 5, fontSize: 20, color: "#B0B0B0" }}>
          Choose Your Fav Chatbuddy
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("chat", { selectedFace: selectedChatFaceData })
        }
        style={[
          { backgroundColor: selectedChatFaceData.primary },
          {
            padding: 17,
            marginTop: 50,
            borderRadius: 100,
            width: Dimensions.get("screen").width * 0.6,
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
