import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ScrollView,
    FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);

    const startAddGoalHandler = () => {
        setModalIsVisible(true);
    };

    const endAddGoalHandler = () => {
        setModalIsVisible(false);
    };

    const addGoalHandler = (enteredGoalText) => {
        // setCourseGoals([...courseGoals, enteredGoalText])      //bad way to do it if you want to use previous state to update new state

        // better way of updating/best practice
        setCourseGoals((currentCourseGoals) => [
            ...currentCourseGoals,
            // { text: enteredGoalText, key: Math.random().toString() },
            { text: enteredGoalText, id: Math.random().toString() },
        ]);
        endAddGoalHandler();
    };

    const deleteGoalHandler = (id) => {
        setCourseGoals((currentCourseGoals) => {
            return currentCourseGoals.filter((goal) => goal.id !== id);
        });
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
                <Button
                    title="Add New Goal"
                    color="#5e0acc"
                    onPress={startAddGoalHandler}
                />
                <GoalInput
                    visible={modalIsVisible}
                    onAddGoal={addGoalHandler}
                    onCancel={endAddGoalHandler}
                />
                <View style={styles.goalsContainer}>
                    {/* <ScrollView alwaysBounceVertical={false}>
                    {courseGoals.map((goal) => (
                        <View key={goal} style={styles.goalItem}>
                            <Text style={styles.goalText}>{goal}</Text>
                        </View>
                    ))}
                </ScrollView> */}
                    {/* <FlatList
                    data={courseGoals}
                    renderItem={(itemData) => {
                        return (
                            <View style={styles.goalItem}>
                                <Text style={styles.goalText}>
                                    {itemData.item.text}
                                </Text>
                            </View>
                        );
                    }}
                    // keyExtractor only necessary if the data object don't have a "key" property on them (so if the key is called id or something)
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    alwaysBounceVertical={false}
                /> */}
                    <FlatList
                        data={courseGoals}
                        renderItem={(itemData) => {
                            const { id, text } = itemData.item;

                            return (
                                <GoalItem
                                    id={id}
                                    text={text}
                                    onDeleteItem={deleteGoalHandler}
                                />
                            );
                        }}
                        // keyExtractor only necessary if the data object don't have a "key" property on them (so if the key is called id or something)
                        keyExtractor={(item, index) => {
                            return item.id;
                        }}
                        alwaysBounceVertical={false}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        flex: 1,
        // backgroundColor: "#1e085a"
    },
    // inputContainer: {
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     marginBottom: 24,
    //     borderBottomWidth: 1,
    //     borderBottomColor: "#cccccc",
    // },
    // textInput: {
    //     borderWidth: 1,
    //     borderColor: "#cccccc",
    //     width: "70%",
    //     marginRight: 8,
    //     padding: 8,
    // },
    goalsContainer: {
        flex: 5,
    },
    // goalItem: {
    //     margin: 8,
    //     padding: 8,
    //     borderRadius: 6,
    //     backgroundColor: "#5e0acc",
    // },
    // goalText: {
    //     color: "#fff",
    // },
});
