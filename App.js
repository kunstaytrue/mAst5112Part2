import React, { useState } from "react";
import {
  SafeAreaView,View,Text,TextInput,Button,FlatList,StyleSheet,Image,Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState("Starters");

  const addItem = () => {
    if (name.trim() === "" || description.trim() === "" || price.trim() === "") {
      Alert.alert("Error", "All fields must be filled in!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price: Number(price),
    };

    setMenu((prev) => [...prev, newItem]);
    setName("");
    setDescription("");
    setPrice("");
    setCourse("Starters");
  };
