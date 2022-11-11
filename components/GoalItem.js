import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const GoalItem = (props) => {
    // const deleteGoalHandler = () => {
    //     props.onDeleteItem(props.id);
    // };

    return (
        <View style={styles.goalItem}>
            {/* <Pressable onPress={deleteGoalHandler}> */}
            <Pressable
                android_ripple={{ color: "#210644" }} // for android
                onPress={props.onDeleteItem.bind(this, props.id)}
                style={({ pressed }) => pressed && styles.pressedItem}  //for ios
            >
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
    },
    pressedItem: {
        opacity: 0.5,
    },
    goalText: {
        padding: 8,
        color: "#fff",
    },
});
