import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  tipoBotao: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  selecionadoReceita: {
    backgroundColor: "#c8e6c9",
  },
  selecionadoDespesa: {
    backgroundColor: "#ffcdd2",
  },
  tipoTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoRegistrar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
