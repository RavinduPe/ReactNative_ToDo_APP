import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { Picker } from "@react-native-picker/picker";

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
    marginVertical: 10,
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
  priority: {
    flexDirection: "row",
    backgroundColor: "#caa9e9",
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 8,
  },
  prioritylable: {
    width: "50%",
    backgroundColor: "red",
    borderRadius: 8,
  },
  priorityText: {
    width: "50%",
    zIndex: 100,
  },
});

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("low");
  const [editingPriority, setEditingPriority] = useState("low");

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem('@tasks');
        const loadedTasks = jsonTasks != null ? JSON.parse(jsonTasks) : [];
        setTasks(loadedTasks);
      } catch (error) {
        console.error('Error loading tasks: ', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks state changes
  useEffect(() => {
    const saveTasks = async () => {
      try {
        const jsonTasks = JSON.stringify(tasks);
        await AsyncStorage.setItem('@tasks', jsonTasks);
      } catch (error) {
        console.error('Error saving tasks: ', error);
      }
    };
    saveTasks();
  }, [tasks]);

  // Function to Add Task
  function addTask() {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        priority: newTaskPriority,
      };
      setTasks([...tasks, newTask]);
      setText("");
      setNewTaskPriority("low");
      Keyboard.dismiss();
    } else {
      Alert.alert("Alert", "Task text cannot be empty.", [{ text: "OK" }]);
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Function to Start Editing a Task
  function startEditingTask(id, currentText, currentPriority) {
    setEditingTaskId(id);
    setEditingText(currentText);
    setEditingPriority(currentPriority);
  }

  // Function to Save Edited Task
  function saveEditedTask() {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, text: editingText, priority: editingPriority }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingText("");
    setEditingPriority("low");
  }

  // Function to Cancel Editing
  function cancelEditing() {
    setEditingTaskId(null);
    setEditingText("");
    setEditingPriority("low");
  }

  // Function to Filter and Sort Tasks
  function getSortedTasks() {
    const filteredTasks =
      filter === "all"
        ? tasks
        : tasks.filter((task) =>
            filter === "completed" ? task.completed : !task.completed
          );

    return filteredTasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  return (
    <View style={styles.main}>
      {/* Filter Buttons */}
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

      {/* Task List */}
      <FlatList
        style={styles.container}
        data={getSortedTasks()}
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
            editingPriority={editingPriority}
            setEditingPriority={setEditingPriority}
          />
        )}
      />
      <View style={styles.priority}>
        <View style={styles.priorityText}>
          <Text>Select priority :</Text>
        </View>
        <View style={styles.prioritylable}>
          <Picker
            selectedValue={newTaskPriority}
            onValueChange={(itemValue) => setNewTaskPriority(itemValue)}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <View>
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
