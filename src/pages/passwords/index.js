import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useIsFocused } from '@react-navigation/native'
import useStorage from "../../hooks/useStorage"
import Icon from 'react-native-vector-icons/Ionicons'

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([])
    const [visiblePassword, setVisiblePassword] = useState({});
    const focused = useIsFocused();
    const { getItem, removeItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem("@pass")
            setListPasswords(passwords);
        }

        loadPasswords();
    }, [focused])

    const togglePasswordVisibility = (index) => {
        setVisiblePassword(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    }

    const handleDeletePassword = async (item) => {
        const passwords = await removeItem("@pass", item)
        setListPasswords(passwords)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fde9ff"}}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    style={{flex: 1, paddingTop: 14}}
                    data={listPasswords}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            style={styles.passwordItem} 
                            onLongPress={() => handleDeletePassword(item)}
                        >
                            <Text style={styles.passwordText}>
                                {visiblePassword[index] ? item : "********"}
                            </Text>
                            <TouchableOpacity onPress={() => togglePasswordVisibility(index)}>
                                <Icon 
                                    name={visiblePassword[index] ? "eye-off" : "eye"} 
                                    size={24} 
                                    color="black" 
                                    style={styles.eyeIcon} 
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#6c3f9d",
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14,
    },
    title: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center"
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14
    },
    passwordItem: {
        backgroundColor: "#6c3f9d",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        width: "100%",
    },
    passwordText: {
        fontSize: 16,
        color: "#FFF"
    },
    eyeIcon: {
        color: "#FFF",
        marginLeft: 10
    }
});
