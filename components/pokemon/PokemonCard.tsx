import { Image, Pressable, StyleSheet, View, type ViewStyle } from "react-native"

import ThemedText from "../ThemedText"
import { Card } from "../Card"
import { useThemeColors } from "@/hooks/useThemeColors"
import { Link, RelativePathString } from "expo-router"
import { getPokemonArtWork } from "@/functions/pokemon"

type Props = {
    style?: ViewStyle,
    id: number,
    name: string
}
export function PokemonCard({style, id, name}: Props) {
    const colors = useThemeColors()

    return <Link href={{ pathname: "/pokemon/[id]", params: { id: id} }} asChild>
            <Pressable style={style}>
                <Card style={[styles.card]}>
                    <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, "0")}</ThemedText>
                    <Image 
                        source={{uri: getPokemonArtWork(id)}} 
                        width={72} 
                        height={72}
                    />
                    <ThemedText>{name}</ThemedText>
                    <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]}></View>
                </Card>
            </Pressable>
        </Link>
} 

const styles = StyleSheet.create({
    card: {
        position: "relative",
        alignItems: "center",
        padding: 4
    },
    id: {
        alignSelf: "flex-end"
    },
    shadow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 7,
        zIndex: -1
    }
})