import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Estilos } from '../style/Estilo'
import { SearchBar } from '../components/SearchBar'
import { Note } from '../components/Note'
import { Entypo } from '@expo/vector-icons'
import { NoteModal } from '../components/NoteModal'
import { NoteDetailModal } from '../components/NoteDetailModal'

export function Home() {
  const [openModal, setOpenModal] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [noteDetail, setNoteDetail] = useState([])
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  async function findNotes() {
    const result = await AsyncStorage.getItem('notes')
    if (result !== null) {
      setNotes(JSON.parse(result))
    }
  }

  useEffect(() => {
    findNotes()
  }, [])

  async function handleOnSubmit(text) {
    const note = { id: Date.now(), text }
    const result = await AsyncStorage.getItem('notes')
    let allNote = JSON.parse(result)
    const updatedNotes = [...allNote, note]
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  function openNote(item) {
    setNoteDetail(item)
    setOpenDetailModal(true)
  }

  async function handleSaveEditNote(text) {
    const result = await AsyncStorage.getItem('notes')
    let note = JSON.parse(result)
    const newNotes = note.filter((n) => {
      if (n.id === noteDetail.id) {
        n.text = text
      }
      return n
    })
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    setSearchQuery('')
    setOpenDetailModal(false)
  }

  async function handleDeletNote() {
    const result = await AsyncStorage.getItem('notes')
    let note = JSON.parse(result)
    const newNotes = note.filter((n) => n.id !== noteDetail.id)
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    setOpenDetailModal(false)
  }

  async function handleOnSearchInput(text) {
    setSearchQuery(text)

    const result = await AsyncStorage.getItem('notes')
    const searchNote = JSON.parse(result)
    const filteredNotes = searchNote.filter((note) => {
      if (note.text.toLowerCase().includes(text.toLowerCase())) {
        return note
      }
    })
    setNotes([...filteredNotes])
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>my.notes</Text>
      </View>
      <View>
        <SearchBar value={searchQuery} onChangeText={handleOnSearchInput} />
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Note item={item} onPress={() => openNote(item)} />
        )}
      />
      <TouchableOpacity style={styles.btn} onPress={() => setOpenModal(true)}>
        <Entypo name="plus" size={40} color="white" />
      </TouchableOpacity>
      {openModal ? (
        <NoteModal
          closeModal={() => setOpenModal(false)}
          onSubmit={handleOnSubmit}
        />
      ) : null}

      {openDetailModal ? (
        <NoteDetailModal
          closeModal={() => setOpenDetailModal(false)}
          textValue={noteDetail.text}
          editNote={handleSaveEditNote}
          deleteNote={handleDeletNote}
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

/*      <NoteDetailModal /> */
