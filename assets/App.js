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
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: "https://img.icons8.com/color/100/restaurant.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Chef’s Menu</Text>
      <Text style={styles.sub}>Total items: {menu.length}</Text>

      <Text style={styles.sectionTitle}>Add New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Dish Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Picker
        selectedValue={course}
        style={styles.input}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <Button title="Add Dish" onPress={addItem} />

      <Text style={styles.sectionTitle}>Current Menu</Text>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.dish}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.price}>R {item.price}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            No menu items yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
