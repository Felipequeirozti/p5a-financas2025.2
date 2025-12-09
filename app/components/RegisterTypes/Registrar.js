import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../RegisterTypes/styleregistre";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";
const API_ENDPOINT = "/receive";

export default function Registrar({ navigation }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState(null);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const { user, refreshBalance } = useContext(AuthContext);
  const authToken = user?.token;

  const registrar = async () => {
    if (!nome || !valor || !tipo) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (isNaN(parseFloat(valor))) {
      Alert.alert("Atenção", "O valor inserido é inválido.");
      return;
    }

    if (!authToken || !user?.id) {
      Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
      return;
    }

    setLoadingRegister(true);

    const transacao = {
      description: nome,
      value: parseFloat(valor),
      type: tipo,
      user_id: user.id,
      date: new Date().toISOString(),
    };

    try {
      await api.post(API_ENDPOINT, transacao, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      refreshBalance();
      Alert.alert("Sucesso", "Transação registrada!");

      if (navigation) navigation.navigate("Home");

      setNome("");
      setValor("");
      setTipo(null);
    } catch (err) {
      console.error("ERRO AO REGISTRAR TRANSAÇÃO:", err);
      const message =
        err.response?.status === 401
          ? "Sessão expirada. Faça login novamente."
          : "Não foi possível registrar a transação. Verifique o servidor e o token.";
      Alert.alert("Erro", message);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Valor desejado</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipo === "receita" && styles.selecionadoReceita,
          ]}
          onPress={() => setTipo("receita")}
        >
          <Text style={styles.tipoTexto}>⬆ Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoBotao,
            tipo === "despesa" && styles.selecionadoDespesa,
          ]}
          onPress={() => setTipo("despesa")}
        >
          <Text style={styles.tipoTexto}>⬇ Despesa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoRegistrar}
        onPress={registrar}
        disabled={loadingRegister}
      >
        {loadingRegister ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.botaoTexto}>Registrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
