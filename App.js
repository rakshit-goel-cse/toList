import { Image, ScrollView, Text, View } from "react-native";
import { s } from "./App-style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import logo from "./assets/logo.png";
import { CardToDo } from "./cardToDo";
import { useState } from "react";
import { Footer } from "./Footer";
import constants from "./constants";
import { Addtodo } from "./Addtodo";

export default function App() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
    {
      id: 2,
      title: "First 2 Title",
      isDone: true,
      description: "Description 2",
    },
    {
      id: 3,
      title: "Firstfedsf Title",
      isDone: false,
      description: "Description 3",
    },
    {
      id: 4,
      title: "First Title",
      isDone: false,
      description: "Description 4",
    },
    {
      id: 5,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
    { id: 6, title: "First Title", isDone: true, description: "Description 1" },
    {
      id: 7,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
    { id: 8, title: "First Title", isDone: true, description: "Description 1" },
    {
      id: 9,
      title: "First Title",
      isDone: false,
      description: "Description 1",
    },
  ]);

  const updateToDo = (todo) => {
    let tempData = [...data];
    let index = tempData.findIndex((t) => t.id == todo.id);
    tempData[index] = todo;
    setData(tempData);
  };

  const deleteToDo = (todo) => {
    setData(data.filter((value) => todo.id != value.id));
  };

  const addTodo = (title, desc) => {
    setData((prevData) => [
      ...prevData,
      {
        id: 1 + prevData[prevData.length - 1].id,
        title: title,
        isDone: false,
        description: desc,
      },
    ]);
  };

  const [selected, setSelected] = useState(constants.all);

  const getFilterData = () => {
    switch (selected) {
      case constants.all:
        return data;
      case constants.in_progress:
        return data.filter((todo) => !todo.isDone);
      case constants.done:
        return data.filter((todo) => todo.isDone);
      default:
        return data;
    }
  };

  return (
    <View style={s.mainPage}>
      <SafeAreaProvider>
        <SafeAreaView style={s.safeArea}>
          <View style={s.header}>
            <Image source={logo} style={s.logo} resizeMode="contain" />
            <Text style={s.headerText}>You have something to do</Text>
          </View>
          <View style={s.body}>
            <ScrollView>
              {getFilterData().map((item) => {
                return (
                  <CardToDo
                    key={item.id}
                    todo={item}
                    updateToDo={updateToDo}
                    deleteToDo={deleteToDo}
                  />
                );
              })}
            </ScrollView>
          </View>
          <Addtodo addTodo={addTodo} />
          <View style={s.footer}>
            <Footer selected={selected} setSelected={setSelected} data={data} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
