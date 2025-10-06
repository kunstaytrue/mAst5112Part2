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
        style={[styles.input, { height: 85 }]}
        placeholder="Dish Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Price "
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
        <Picker.Item label="Mains" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <Button title="Add New Dish" onPress={addItem} />

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6f0",
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  sub: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  dish: {
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  course: {
    color: "#333",
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    color: "#007BFF",
    fontWeight: "bold",
    marginTop: 2,
  },
});

