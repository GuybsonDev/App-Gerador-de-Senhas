import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';
import { ModalPassword } from "../../components/modal"; // Caminho ajustado

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@@@@@##";

export function Home() {
    const [size, setSize] = useState(10);
    const [passwordValue, setPasswordValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    function generatePassword() {
        let password = "";
        for (let i = 0, n = charset.length; i < size; i++) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }

        setPasswordValue(password);
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/icon_center.png")} 
                style={styles.logo}
            />
            <Text style={styles.title}>{size} Caracteres</Text>

            <View style={styles.area}>
                <Slider
                    style={{ height: 50 }}
                    minimumValue={6}
                    maximumValue={20}
                    thumbTintColor="#6c3f9d"
                    minimumTrackTintColor="#6c3f9d"
                    maximumTrackTintColor="#6c3f9d"
                    value={size}
                    onValueChange={(value) => setSize(Math.round(value))}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={generatePassword}>
                <Text style={styles.buttonText}>Gerar Senha</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fde9ff",
        justifyContent: 'center',
        alignItems: "center"
    },
    logo: {
        marginBottom: 60,
        width: 300,
        height: 300
    },
    area: {
        marginTop: 14,
        marginBottom: 14,
        width: "80%",
        backgroundColor: "#fde9ff",
        borderRadius: 8,
        padding: 8,
    },
    button: {
        backgroundColor: "#6c3f9d",
        elevation: 10,
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 18
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
    },
    title: {
        color: "#4c4452",
        fontSize: 30,
        fontWeight: "bold"
    }
});
