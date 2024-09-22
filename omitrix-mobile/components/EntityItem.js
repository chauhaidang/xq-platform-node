import {Text, View, StyleSheet, Pressable} from "react-native";
import {testProps} from "../utils/test-utils";

function EntityItem(props) {
    const index = props.index
    const content = props.value
    return (
        <View style={styles.entityItem}>
            <Pressable
                {...testProps(`item-entity-${index}`)}
                android_ripple={styles.androidRipple}
                onPress={() => {
                    props.onDelete(props.id)
                }}
                style={({pressed}) => pressed && styles.iosRipple}
            >
                <Text style={styles.entityItemText}>
                    {content}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    entityItem: {
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        borderColor: '#EE6B6E',
        borderStyle: 'solid',
        borderCurve: 'circular',
        marginTop: 5,
        borderRadius: 5,
    },
    entityItemText: {
        padding: 5,
        color: 'black'
    },
    androidRipple: {
        color: '#EE6B6E'
    },
    iosRipple: {
        opacity: 0.5,
        backgroundColor: '#EE6B6E'
    }
})

export default EntityItem