import { Text, TouchableOpacity, View } from "react-native";
import { s } from "./Footer-style";
import constants from "./constants";

export function Footer({ selected, setSelected, data }) {
  const countValues = data.reduce(
    (acc, todo) => {
      todo.isDone ? acc.completed++ : acc.inProgress++;
      return acc;
    },
    {
      inProgress: 0,
      completed: 0,
    }
  );

  const selected_text_style = (textKey) => {
    return {
      fontWeight: "bold",
      color: selected == textKey ? "#8209b3" : "black",
    };
  };

  return (
    <View style={s.root}>
      <TouchableOpacity onPress={() => setSelected(constants.all)}>
        <Text style={selected_text_style(constants.all)}>
          All {data.length}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelected(constants.in_progress)}>
        <Text style={selected_text_style(constants.in_progress)}>
          In Progress {countValues.inProgress}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelected(constants.done)}>
        <Text style={selected_text_style(constants.done)}>
          Done {countValues.completed}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
