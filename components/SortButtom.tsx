import { useThemeColors } from '@/hooks/useThemeColors'
import { useRef, useState } from 'react'
import { View, StyleSheet, Image, Pressable, Modal, Text, Dimensions } from 'react-native'
import ThemedText from './ThemedText'
import { Card } from './Card'
import { Row } from './Row'
import { Radio } from './Radio'
import { Shadows } from '@/constants/Shadows'


type Props = {
  value: "id" | "name"
  onChange: (v: "id" | "name") => void
}

const options =[
  {label: "Number", value: "id"},
  {label: "Name", value: "name"},
] as const

export function SortButtom({value, onChange}: Props) {
  const buttomRef = useRef<View>(null)
  const colors = useThemeColors()
  const [isModalVisible, setModalVisibility] = useState(false)
  const [position, setPosition] = useState<null | {top: number; right: number}>(null)
  const onButtomPress = () => {
    buttomRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width
      })
    })
    setModalVisibility(true)
  }

  const onClose = () => {
    setModalVisibility(false)
  }

  return (
    <>
      <Pressable onPress={onButtomPress}>
        <View ref={buttomRef} style={[styles.buttom, {backgroundColor: colors.grayWhite}]}>
          <Image 
            source={
              value === "id" ?
              require("@/assets/images/number.png") :
              require("@/assets/images/alpha.png")
            } 
            width={16} 
            height={16}
          />
        </View>
        <Modal 
          animationType="fade" 
          transparent 
          visible={isModalVisible} 
          onRequestClose={onClose}
        >
          <Pressable style={styles.backdrop} onPress={onClose} />
            <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
              <ThemedText 
                style={styles.title} 
                variant='subtitle2' 
                color='grayWhite'
              >
                Sort by :
              </ThemedText>
              <Card style={styles.card}>
                {options.map(o => (
                  <Pressable key={o.value} onPress={() => onChange(o.value)}>
                    <Row gap={8}>
                      <Radio checked={o.value === value}/>
                      <ThemedText>{o.label}</ThemedText>
                    </Row>
                  </Pressable>
                ))}
              </Card>
            </View>
        </Modal>
      </Pressable>
    </>
  )
}


const styles = StyleSheet.create({
  buttom: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  popup: {
    position: "absolute",
    width: 113,
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
    ...Shadows.dp2
  },
  title: {
    paddingLeft: 20
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 20
  }
})