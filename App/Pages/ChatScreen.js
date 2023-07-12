import { View, Text } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import GlobalApi from "../Services/GlobalApi";

export default function ChatScreen() {
  const param = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChatFace, setSelectedChatFace] = useState();

  useEffect(() => {
    // console.log(param.selectedFace);
    setSelectedChatFace(param.selectedFace);
    setMessages([
      {
        _id: 1,
        text:
          "Hello, I'm " + param.selectedFace?.name + ", How can I help you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: param.selectedFace?.image,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setLoading(true);
    if (messages[0].text) {
      getBardResponse(messages[0].text);
    }
  }, []);

  const getBardResponse = (msg) => {
    console.log(msg);
    GlobalApi.getBardApi(msg).then((resp) => {
      //   console.log(resp);
      if (resp.data.resp[1].content) {
        const chatApiResponse = {
          _id: Math.random() * (9999999 - 1),
          text: resp.data.resp[1].content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React NAtive",
            avatar: param.selectedFace?.image,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatApiResponse)
        );
        setLoading(false);
      } else {
        setLoading(false);
        const chatApiResponse = {
          _id: Math.random() * (9999999 - 1),
          text: "Sorry, I can't help you with it. ",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React NAtive",
            avatar: param.selectedFace?.image,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, chatApiResponse)
        );
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 5 }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
