import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Estilos } from '../style/Estilo'

export function Note({ item }) {
  const { text } = item
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text} numberOfLines={3}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7E64ff',
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    height: 100
  },
  text: {
    color: 'white',
    fontFamily: Estilos.fonte.semiBold,
    fontSize: 16
  }
})
