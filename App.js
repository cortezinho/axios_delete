import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [users, setUsers] = useState([]);

  const API = "http://10.110.12.47:3000/users";

  // Função para buscar os usuários da API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
      Alert.alert("Erro", "Não foi possível carregar os usuários.");
    }
  };

  // Função para deletar um usuário
  const deleteUser = async (id) => {
    try {
      // Faz a requisição DELETE para a API
      await axios.delete(`${API}/${id}`);

      // Atualiza o estado local removendo o usuário deletado
      // Isso atualiza a tela sem precisar buscar a lista toda novamente
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      
      Alert.alert("Sucesso", "Usuário deletado!");

    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}: `, error);
      Alert.alert("Erro", "Não foi possível deletar o usuário.");
    }
  };

  // useEffect para chamar a função fetchUsers assim que o componente for montado
  useEffect(() => {
    fetchUsers();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DELETE - Deletar Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button 
              title="Deletar" 
              onPress={() => deleteUser(item.id)} 
              color="#ff4d4d" 
            />
          </View>
        )}
        style={{ width: '100%' }} // Garante que a FlatList ocupe a largura
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2, // Sombra para Android
  },
  itemText: {
    fontSize: 16,
  },
});