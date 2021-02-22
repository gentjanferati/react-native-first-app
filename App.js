import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAdd, setIsAdd]= useState(false)
  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAdd(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  }; 

  const cancelGoalAdditionHandler = () =>{
    setIsAdd(false);
  }
  return (
    <View style={styles.screen}>
      <Button  title='Add New Goal' onPress={() => setIsAdd(true)} />
      <GoalInput visible={isAdd} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler}/>
      <FlatList
        keyExtractor={(item, idex) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
