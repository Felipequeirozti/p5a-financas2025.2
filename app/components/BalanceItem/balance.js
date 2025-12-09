import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/auth";

const FinancialSummaryPanel = () => {
  const { financialData, refreshBalance, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        if (!user?.token) {
          setError("Usuário não autenticado.");
          return;
        }

        await refreshBalance();
      } catch (err) {
        console.error("Erro ao carregar dados financeiros:", err);
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    loadBalance();
  }, []);

  const formatCurrency = (value) =>
    typeof value === "number"
      ? value
          .toFixed(2)
          .replace(".", ",")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : value;

  const renderCard = (title, value, colorStyle) => (
    <View style={[styles.card, colorStyle]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : error ? (
        <Text style={styles.cardValue}>{error}</Text>
      ) : (
        <Text style={styles.cardValue}>R$ {formatCurrency(value)}</Text>
      )}
    </View>
  );

  const { entradasHoje = 0, saidasHoje = 0 } = financialData || {};
  const saldoAtual = entradasHoje - saidasHoje;

  return (
    <View style={styles.panelContainer}>
      {renderCard("Saldo atual", saldoAtual, styles.cardBlue)}
      {renderCard("Entradas de hoje", entradasHoje, styles.cardGreen)}
      {renderCard("Saídas de hoje", saidasHoje, styles.cardRed)}
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardBlue: {
    backgroundColor: "#3B3DBF",
  },
  cardGreen: {
    backgroundColor: "#4CAF50",
  },
  cardRed: {
    backgroundColor: "#F44336",
  },
});

export default FinancialSummaryPanel;
