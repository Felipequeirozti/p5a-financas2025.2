import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import FinancialSummaryPanel from "../../components/BalanceItem/balance";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const { user, refreshBalance } = useContext(AuthContext);
  const userToken = user?.token;

  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovimentacoes = async () => {
    try {
      if (!userToken) {
        setError("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      const response = await api.get("/receives", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setMovimentacoes(response.data || []);
    } catch (err) {
      console.error("Erro ao buscar movimentações:", err);
      setError("Erro ao carregar movimentações.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMovimentacao = async (id) => {
    try {
      if (!userToken) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      await api.delete(`/receives/delete?item_id=${id}&user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      Alert.alert("Sucesso", "Movimentação excluída!");
      fetchMovimentacoes();
      refreshBalance();
    } catch (err) {
      console.error("Erro ao deletar movimentação:", err.response?.data || err);
      Alert.alert("Erro", "Não foi possível remover a movimentação.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMovimentacoes();
      refreshBalance();
    }, [userToken])
  );

  const entradas = movimentacoes
    .filter((item) => item.type === "receita")
    .reduce((acc, item) => acc + item.value, 0);

  const saidas = movimentacoes
    .filter((item) => item.type === "despesa")
    .reduce((acc, item) => acc + item.value, 0);

  const saldoAtual = entradas - saidas;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <FinancialSummaryPanel
          saldo={saldoAtual}
          entradasHoje={entradas}
          saidasHoje={saidas}
        />

        <View style={styles.movimentacoesContainer}>
          <View style={styles.movimentacoesHeader}>
            <View style={styles.iconList} />
            <Text style={styles.movimentacoesTitle}>Últimas movimentações</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#3B3DBF" />
          ) : error ? (
            <Text style={styles.movimentacaoDescricao}>{error}</Text>
          ) : movimentacoes.length === 0 ? (
            <Text style={styles.movimentacaoDescricao}>
              Nenhuma movimentação encontrada.
            </Text>
          ) : (
            movimentacoes.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.movimentacaoItem,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <View>
                  <View
                    style={[
                      styles.badge,
                      item.type === "despesa"
                        ? styles.badgeDespesa
                        : styles.badgeReceita,
                    ]}
                  >
                    <Text style={styles.badgeText}>
                      {item.type === "despesa" ? "despesa" : "receita"}
                    </Text>
                  </View>

                  <Text style={styles.movimentacaoValor}>
                    R$ {item.value.toFixed(2).replace(".", ",")}
                  </Text>

                  {item.description && (
                    <Text style={styles.movimentacaoDescricao}>
                      {item.description}
                    </Text>
                  )}
                </View>

                <TouchableOpacity onPress={() => deleteMovimentacao(item.id)}>
                  <Icon name="delete" size={24} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
