import {Button, Image, Modal, StyleSheet, TextInput, View} from "react-native";
import {useState} from "react";
import {testProps} from "../utils/test-utils";

function EntityInput(props) {
    const [enterEntityTxt, setEnterEntityTxt] = useState('')

    const entityInputHandler = (entityText) => {
        setEnterEntityTxt(entityText)
    }

    function addGoalHandler() {
        props.onAddEntity(enterEntityTxt)
        setEnterEntityTxt('')
    }

    return (
        <Modal visible={props.isVisible} animationType={'slide'}>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/omitrix-logo.png')}/>
                <TextInput {...testProps('input-entity')} style={styles.textInput} placeholder={'Enter your entity here'}
                           onChangeText={entityInputHandler} value={enterEntityTxt}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title={'Add'} onPress={addGoalHandler}
                                                        color='#EE6B6E'/></View>
                    <View style={styles.button}><Button title={'Clear All'} onPress={props.onClearEntities}/></View>
                    <View style={styles.button}><Button title={'Close'} onPress={props.onDismiss}/></View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    textInput: {
        borderColor: '#DCDCDC',
        borderWidth: 1,
        width: '100%',
        padding: 9,
    },
    buttonContainer: {
        marginTop: 15,
        flexDirection: 'row'
    },
    button: {
        width: '30%',
        marginHorizontal: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#EE6B6E'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 30
    }
})

export default EntityInput