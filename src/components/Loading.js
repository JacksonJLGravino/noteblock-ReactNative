import { View, ActivityIndicator, StyleSheet } from 'react-native'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#373435" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
