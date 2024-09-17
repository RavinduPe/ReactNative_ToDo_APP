import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  startEditingTask,
  isEditing,
  editingText,
  setEditingText,
  saveEditedTask,
  cancelEditing,
  editingPriority,
  setEditingPriority,
}) {
  const styles = StyleSheet.create({
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginVertical: 5,
      backgroundColor:
        task.priority === "low"
          ? "#f5fffa"
          : task.priority === "medium"
          ? "#93ccea"
          : "#fa9f9f",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    checkboxContainer: {
      marginRight: 10,
    },
    todoItemText: {
      flex: 1,
      fontSize: 16,
      color: "#333",
      fontWeight: "700",
    },
    completed: {
      textDecorationLine: "line-through",
      color: "#999",
    },
    deleteButton: {
      backgroundColor: "#FF6347",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: "#fff",
      fontSize: 14,
    },
    editButton: {
      backgroundColor: "#FFD700",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginLeft: 5,
    },
    saveButton: {
      backgroundColor: "#32CD32",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    cancelButton: {
      backgroundColor: "#FF6347",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginLeft: 5,
    },
  });

  return (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: "#4CAF50", false: "#ccc" }}
        />
      </View>
      {isEditing ? (
        <>
          <TextInput
            style={styles.todoItemText}
            value={editingText}
            onChangeText={setEditingText}
          />
          <Picker
            style={{ width: "10%" }}
            selectedValue={editingPriority}
            onValueChange={setEditingPriority}
          >
            <Picker.Item label="Low" value="low" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="High" value="high" />
          </Picker>
          <TouchableOpacity style={styles.saveButton} onPress={saveEditedTask}>
            <Text style={styles.deleteButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
            <Text style={styles.deleteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={[styles.todoItemText, task.completed && styles.completed]}
          >
            {task.text} ({task.priority})
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => startEditingTask(task.id, task.text, task.priority)}
          >
            <Text style={styles.deleteButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(task.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
