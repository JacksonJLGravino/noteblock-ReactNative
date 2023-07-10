import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Estilos } from '../style/Estilo'

export function NoteDetailModal({
  closeModal,
  editNote,
  textValue,
  deleteNote
}) {
  const [text, setText] = useState(textValue)

  function newText() {
    editNote(text)
    setText(textValue)
    closeModal()
  }

  return (
    <Modal animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal}>
            <Entypo name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Note</Text>
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
          <TouchableOpacity style={styles.confirm} onPress={newText}>
            <Entypo name="check" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={deleteNote}>
            <Entypo name="trash" size={32} color="white" />
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
    marginBottom: 24
  },
  cancel: {
    width: 64,
    height: 64,
    backgroundColor: '#ff636c',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
})
