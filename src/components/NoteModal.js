import React, { useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Estilos } from '../style/Estilo'

export function NoteModal({ closeModal, onSubmit }) {
  const [text, setText] = useState('')

  function handleSave() {
    if (!text.trim()) {
      return closeModal()
    }
    onSubmit(text)
    setText('')
    closeModal()
  }

  return (
    <Modal animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>New Note</Text>
          <View style={{ width: 24, height: 24 }}></View>
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Escreva aqui..."
            placeholderTextColor="white"
            style={styles.textInput}
            textAlignVertical="top"
            multiline={true}
            onChangeText={setText}
            value={text}
          />
        </View>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.confirm} onPress={handleSave}>
            <AntDesign name="check" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={() => setText('')}>
            <AntDesign name="delete" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1338',
    padding: 20
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  title: {
    fontFamily: Estilos.fonte.bold,
    color: 'white',
    fontSize: 24
  },
  input: {
    flex: 1,
    backgroundColor: '#2b135a',
    marginVertical: 32,
    borderRadius: 8
  },
  textInput: {
    flex: 1,
    padding: 16,
    color: 'white'
  },
  btns: {
    alignSelf: 'flex-end'
  },
  confirm: {
    width: 64,
    height: 64,
    backgroundColor: '#7E64FF',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginBottom: 24
  },
  cancel: {
    width: 64,
    height: 64,
    backgroundColor: '#ff636c',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end'
  }
})
