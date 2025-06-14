import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface props {
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
}

const InfoBox: React.FC<props> = ({children, style}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderCurve: 'circular',
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginBottom: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 6
        },
        elevation: 2,
        padding: 16,
        gap: 8
    }
})

export default InfoBox;