import React, { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [financialData, setFinancialData] = useState({
    saldo: 0,
    entradasHoje: 0,
    saidasHoje: 0,
  });

  const [movimentacoes, setMovimentacoes] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function resetStorage() {
      await AsyncStorage.clear();
      setUser(null);
      setFinancialData({ saldo: 0, entradasHoje: 0, saidasHoje: 0 });
      setMovimentacoes([]);
    }
    resetStorage();
  }, []);

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser(null);
      api.defaults.headers["Authorization"] = null;
      setFinancialData({ saldo: 0, entradasHoje: 0, saidasHoje: 0 });
      setMovimentacoes([]);
    });
  }

  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    try {
      await api.post("/users", { name: nome, password, email });
      setLoadingAuth(false);
      navigation.goBack();
    } catch (err) {
      console.log("ERRO AO CADASTRAR", err);
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const response = await api.post("/login", { email, password });
      const { id, name, token } = response.data;

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser({ id, name, email, token });

      await refreshBalance(token);
      await carregarMovimentacoes(token);

      setLoadingAuth(false);
    } catch (err) {
      console.log("ERRO AO LOGAR ", err);
      setLoadingAuth(false);
    }
  }

  async function refreshBalance(passedToken = null) {
    try {
      const tokenToUse = passedToken || user?.token;
      if (!tokenToUse) return;

      const response = await api.get("/balance", {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });

      const data = response.data;
      const saldoObj = data.find((item) => item.tag === "saldo");
      const receitaObj = data.find((item) => item.tag === "receita");
      const despesaObj = data.find((item) => item.tag === "despesa");

      setFinancialData({
        saldo: saldoObj?.saldo || 0,
        entradasHoje: receitaObj?.saldo || 0,
        saidasHoje: despesaObj?.saldo || 0,
      });
    } catch (err) {
      console.error("Erro ao atualizar saldo:", err);
    }
  }

  async function carregarMovimentacoes(passedToken = null) {
    try {
      const tokenToUse = passedToken || user?.token;
      if (!tokenToUse) return;

      const response = await api.get("/receives", {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });

      setMovimentacoes(response.data || []);
    } catch (err) {
      console.log("Erro ao carregar movimentações:", err);
    }
  }

  async function adicionarMovimentacao(dados) {
    try {
      const tokenToUse = user?.token;
      await api.post("/receive", dados, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      carregarMovimentacoes();
      refreshBalance();
    } catch (err) {
      console.log("Erro ao adicionar movimentação:", err);
    }
  }

  async function excluirMovimentacao(id) {
    try {
      const tokenToUse = user?.token;
      await api.delete("/receives/delete", {
        headers: { Authorization: `Bearer ${tokenToUse}` },
        data: {
          item_id: id,
          user_id: user.id,
        },
      });
      carregarMovimentacoes();
      refreshBalance();
      Alert.alert("Sucesso", "Movimentação excluída com sucesso!");
    } catch (err) {
      console.log("Erro ao excluir movimentação:", err.response?.data || err);
      Alert.alert("Erro", "Não foi possível excluir a movimentação.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        signOut,
        loadingAuth,
        financialData,
        refreshBalance,
        movimentacoes,
        carregarMovimentacoes,
        adicionarMovimentacao,
        excluirMovimentacao,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
