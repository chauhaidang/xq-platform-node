import { Button, StyleSheet, TextInput, View } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
    return (
        <View style={styles.inputContainer}>
            <TextInput />
            <PrimaryButton>Reset</PrimaryButton>
            <PrimaryButton>Confirm</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 100,
        marginHorizontal: 25,
        padding: 16,
        backgroundColor: "#EE6B6E",
        borderRadius: 8,
        // for Android
        elevation: 10,
        // for ios
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
})

export default StartGameScreen;