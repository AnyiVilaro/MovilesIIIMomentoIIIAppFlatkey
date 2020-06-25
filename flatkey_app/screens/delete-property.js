import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

function DeleteProperty({ route, navigation }) {
    const { id, address, area, landlord, price, rooms, title, type, isowner } = route.params;            

    const deleteProperty = async () => {

        try {
            const response = await fetch('http://192.168.0.7:3000/api/property/delete/'+id, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            const json = await response.json();
            Alert.alert("Property deleted successfuly");
            navigation.navigate('ListProperties', {
                email: landlord,
                isowner: isowner
            });
        } catch (error) {
            Alert.alert("An error has ocurred: " + error);            
        }
    }


    return (
        <View style={styles.container}>                      
            <Text style={styles.text}>Title: {title}</Text>
            <Text style={styles.text}>Type: {type}</Text>
            <Text style={styles.text}>Address: {address}</Text>
            <Text style={styles.text}>Rooms: {rooms}</Text>
            <Text style={styles.text}>Price: {price}</Text>
            <Text style={styles.text}>Area: {area}</Text>
            <Text style={styles.text}>Landlord: {landlord}</Text>

            <TouchableHighlight style={styles.createPropertyButton} onPress={()=>
            Alert.alert(
                'Delete Property',
                'Are you sure you want to delete this property?',
                [
                    { text: 'Cancel', style: 'cancel', },
                    {
                        text: 'OK', onPress: deleteProperty
                    },
                ],
                { cancelable: false },
            )}>
                <Text style={styles.textStyleButton}>Delete</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        padding: 20,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        width: Dimensions.get('screen').width * 0.9
    },
    createPropertyButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#0288d1',
        borderRadius: 5,
        width: Dimensions.get('screen').width * 0.9,
        alignItems: 'center'
    },
    textStyleButton: {
        color: 'white',
        fontSize: 16
    }
});
export default DeleteProperty;	
