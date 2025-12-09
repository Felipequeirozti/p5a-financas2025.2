import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  menuIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  boasVindas: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  botaoAzul: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  textoBotaoAzul: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoSair: {
    borderWidth: 2,
    borderColor: "#F44336",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotaoSair: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "bold",
  },
});
