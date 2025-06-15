import { Colors } from '@/constants/Colors'
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'

interface props {
    placeholder?: string,
    label: string, 
    required?: boolean,
    isPassword?: boolean,
    inputMode?: 'email' | 'decimal' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url',
    keyboardType?: string,
    value?: string
    setValue?: (text: string ) => void,
    inputControlStyle?: StyleProp<TextStyle>,
    inputLabelStyle?: StyleProp<TextStyle>, 
}

const InputBox: React.FC<props> = ({
    placeholder,
    label,
    required = false,
    isPassword = false,
    inputMode = 'text',
    inputControlStyle,
    inputLabelStyle,
    setValue,
    value
}) => {
    return (
        <View style={styles.input}>
            <Text style={[styles.inputLabel, inputLabelStyle]}>
                {label}
                { required && <Text style={[styles.inputLabel, inputLabelStyle, {color: Colors.light.danger}]}> *</Text>}
            </Text>

            <TextInput
                placeholder={placeholder}
                placeholderTextColor={Colors.light.textTeritary}
                style={[styles.inputControl, inputControlStyle]}
                clearButtonMode="while-editing"
                secureTextEntry={isPassword}
                inputMode={inputMode}
                value={value?.toString()}
                onChangeText={setValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 16
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.textPrimary,
        marginBottom: 8
    }, 
    inputControl: {
        padding: 12,
        borderCurve: 'circular',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.light.border,
        backgroundColor: Colors.light.backgroundSecondary,
        fontSize: 13
    }
})

export default InputBox;