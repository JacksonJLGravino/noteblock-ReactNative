import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import { Estilos } from '../style/Estilo'

export function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquise aqui..."
        style={styles.search}
        value={value}
        onChangeText={onChangeText}
      />
      <Entypo
        name="magnifying-glass"
        size={24}
        color="#4f4f4f"
        style={styles.icon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#ccc2fe',
    borderRadius: 50
  },
  search: {
    paddingVertical: 8,
    paddingLeft: 40,
    paddingRight: 8,
    fontFamily: Estilos.fonte.regular
  },
  icon: {
    position: 'absolute',
    left: 10,
    bottom: 10
  }
})
