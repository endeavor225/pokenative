import { View, StyleSheet, ViewProps, } from 'react-native'
import { Row } from '../Row'
import ThemedText from '../ThemedText'
import { useThemeColors } from '@/hooks/useThemeColors'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useEffect } from 'react'

type Props = ViewProps & {
    name: string,
    value: number,
    color: string
}

function statShortName (name: string): string {
    return name
        .replaceAll("special", "S")
        .replaceAll("-", "")
        .replaceAll("attack", "ATK")
        .replaceAll("defense", "DEF")
        .replaceAll("speed", "SPD")
        .toUpperCase()
}

export function PokemonStat({ style, name, value, color, ...rest}: Props) {
    const colors = useThemeColors()
    const shareValue = useSharedValue(value)
    const barInnerStyle = useAnimatedStyle(() => {
        return {
          flex: shareValue.value
        };
    });
    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
          flex: 255 - shareValue.value
        };
    });

    useEffect(()=> {
        shareValue.value = withSpring(value)
      }, [value])
    return (
        <Row style={[style, styles.root]} {...rest} gap={8}>
            <View style={[styles.name, {borderColor: colors.grayLight}]}>
                <ThemedText variant='subtitle3' style={{color: color}}> {statShortName(name)} </ThemedText>
            </View>
            <View style={styles.number}>
                <ThemedText> {value.toString().padStart(3, "0")} </ThemedText>
            </View>
            <Row style={styles.bar}>
                <Animated.View style={[styles.barInner, { backgroundColor: color}, barInnerStyle]}/>
                <Animated.View style={[styles.barBackground, barBackgroundStyle, {backgroundColor: color}]}/>
            </Row>
        </Row>
    )
}

const styles = StyleSheet.create({
    root: {},
    name: {
        width: 40,
        paddingRight: 8,
        borderRightWidth: 1,
        borderStyle: "solid",
    },
    number: {
        width: 23
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 4,
        overflow: "hidden"
    },
    barInner: {
        height: 4,
    },
    barBackground:{
        height: 4,
        opacity: 0.24
    }
})
