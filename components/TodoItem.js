import React from "react";
import { View, Text, TextInput, CheckBox, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';
//import Checkbox from 'expo-checkbox';

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
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
  editlayout:{
    justifyContent:"flex-end",
    flex:1,
    gap:4,
    flexDirection:"row"
  }
});

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
}) {
  return (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: "#4CAF50", false: "#ccc" }} // Green when checked
        />
      </View>
      
      {isEditing ? (
        <TextInput
          style={[styles.todoItemText]}
          value={editingText}
          onChangeText={setEditingText}
        />
      ) : (
        <Text style={[styles.todoItemText, task.completed && styles.completed]}>
          {task.text}
        </Text>
      )}

      {isEditing ? (
        <>
          <TouchableOpacity style={styles.saveButton} onPress={saveEditedTask}>
            <Text style={styles.deleteButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
            <Text style={styles.deleteButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
        <View style={styles.editlayout}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => startEditingTask(task.id, task.text)}
          >
            <Text style={styles.deleteButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(task.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        </>
      )}
      
    </View>
  );
}
