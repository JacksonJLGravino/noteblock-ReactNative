import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Estilos } from '../style/Estilo'
import { SearchBar } from '../components/SearchBar'
import { Note } from '../components/Note'
import { AntDesign } from '@expo/vector-icons'
import { NoteModal } from '../components/NoteModal'
import { useNotes } from '../contexts/NoteProvider'

export function Home() {
  const [openModal, setOpenModar] = useState(false)
  const [resultNotFoud, setResultNotFoud] = useState(true)
  const [notes, setNotes] = useState([])

  async function findNotes() {
    const result = await AsyncStorage.getItem('notes')
    console.log(result)
    if (result !== null) {
      setNotes(JSON.parse(result))
    }
  }

  useEffect(() => {
    AsyncStorage.clear()
    // findNotes()
  }, [])

  async function handleOnSubmit(text) {
    const note = { id: Date.now(), text }
    const updatedNotes = [...notes, note]
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>my.notes</Text>
      </View>
      <View>
        <SearchBar />
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Note item={item} />}
      />
      <TouchableOpacity style={styles.btn} onPress={() => setOpenModar(true)}>
        <AntDesign name="plus" size={40} color="white" />
      </TouchableOpacity>
      {openModal ? (
        <NoteModal
          closeModal={() => setOpenModar(false)}
          onSubmit={handleOnSubmit}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1338',
    padding: 20,
    paddingTop: StatusBar.currentHeight + 20
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: Estilos.fonte.bold
  },
  btn: {
    width: 64,
    height: 64,
    backgroundColor: '#7E64FF',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginTop: 32
  }
})
