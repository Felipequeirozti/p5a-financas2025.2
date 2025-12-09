import styled from "styled-components/native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuButton: {
    padding: 5,
    marginRight: 15,
  },
  menuLine: {
    width: 22,
    height: 2,
    backgroundColor: "#333",
    marginVertical: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  saldoCard: {
    backgroundColor: "#5e4fff",
    margin: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 8,
  },
  saldoLabel: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  saldoValor: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 20,
    top: 120,
    backgroundColor: "#00c853",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "300",
  },
  movimentacoesContainer: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 60,
    padding: 15,
    borderRadius: 8,
  },
  movimentacoesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  iconList: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 2,
    marginRight: 8,
  },
  movimentacoesTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  movimentacaoItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeDespesa: {
    backgroundColor: "#ff5252",
  },
  badgeReceita: {
    backgroundColor: "#00c853",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "lowercase",
  },
  movimentacaoValor: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  movimentacaoDescricao: {
    fontSize: 13,
    color: "#666",
  },
});

export default styles;
