import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  FlatList,
  Alert,
} from "react-native";
import TodoItem from "./TodoItem";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: "#333",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    padding:2,
  },
  filterButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Doctor Appointment", completed: true },
    { id: 2, text: "Meeting at School", completed: false },
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Function to Add Task
  function addTask() {
    if (text.trim()) {
      const newTask = { id: Date.now(), text, completed: false };
      setTasks([...tasks, newTask]);
      setText("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Alert", "Task text cannot be empty.", [
        {
          text: "OK",
          onPress: () => console.log("Alert OK Pressed"),
        },
      ]);
    }
  }

  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Function to Start Editing a Task
  function startEditingTask(id, currentText) {
    setEditingTaskId(id);
    setEditingText(currentText);
  }

  // Function to Save Edited Task
  function saveEditedTask() {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingText } : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
    Keyboard.dismiss;
  }

  // Function to Cancel Editing
  function cancelEditing() {
    setEditingTaskId(null);
    setEditingText("");
    Keyboard.dismiss;
  }

  // Function to Filter Tasks
  function getFilteredTasks() {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "non-completed":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("all")}
        >
          <Text style={styles.filterButtonText}>All Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("completed")}
        >
          <Text style={styles.filterButtonText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilter("non-completed")}
        >
          <Text style={styles.filterButtonText}>Non-Completed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.container}
        data={getFilteredTasks()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            startEditingTask={startEditingTask}
            isEditing={item.id === editingTaskId}
            editingText={editingText}
            setEditingText={setEditingText}
            saveEditedTask={saveEditedTask}
            cancelEditing={cancelEditing}
          />
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
