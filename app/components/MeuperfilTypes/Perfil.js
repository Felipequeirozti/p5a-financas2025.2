import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "../MeuperfilTypes/PerfilStyle";

export default function Perfil({ navigation }) {
  const handleRegistrarGastos = () => {
    navigation.navigate("RegistrarTransacao");
  };

  const handleSair = () => {
    console.log("Usuário saiu");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boasVindas}>Bem vindo de volta</Text>

      <TouchableOpacity
        style={styles.botaoAzul}
        onPress={handleRegistrarGastos}
      >
        <Text style={styles.textoBotaoAzul}>Registrar gastos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSair} onPress={handleSair}>
        <Text style={styles.textoBotaoSair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
