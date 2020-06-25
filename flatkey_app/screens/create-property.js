import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

function CreateProperty({ route, navigation }) {
    const { email, isowner } = route.params;
    const [data, setData] = useState([
        title = '',
        type = '',
        address = '',
        rooms = '',
        price = '',
        area = ''
    ]);

    const createProperty = async () => {
        if ( data.title.length == 0 || data.type.length == 0 || data.address.length == 0 || data.rooms.length == 0 || data.price.length == 0 || data.area.length == 0) {
            Alert.alert('Wrong Input!', 'Fields cannot be empty.', [
                {text: 'OK'}
            ]);
            return;
        }
    
        try {
            const response = await fetch('http://192.168.0.7:3000/api/property/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    type: data.type,
                    address: data.address,
                    rooms: data.rooms,
                    price: data.price,
                    area: data.area,
                    landlord: email
                }),
            });
            const json = await response.json();
            Alert.alert("Property created successfuly");
            navigation.navigate('ListProperties', {
                email: email,
                isowner: isowner
            });
        } catch (error) {
            Alert.alert("An error has ocurred: " + error);
        }
        
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Title" onChangeText={text => setData({...data, title: text})} />
            <TextInput style={styles.textInput} placeholder="Type" onChangeText={text => setData({...data, type: text})} />
            <TextInput style={styles.textInput} placeholder="Address" onChangeText={text => setData({...data, address: text})} />
            <TextInput style={styles.textInput} placeholder="Rooms" onChangeText={text => setData({...data, rooms: text})} />
            <TextInput style={styles.textInput} placeholder="Price" onChangeText={text => setData({...data, price: text})} />
            <TextInput style={styles.textInput} placeholder="Area" onChangeText={text => setData({...data, area: text})} />
            
            <TouchableHighlight style={styles.createPropertyButton} onPress={createProperty}>
                <Text style={styles.textStyleButton}>Create Property</Text>
            </TouchableHighlight>
        </View>
    );
};

const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    textInput: {
        padding: 10,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        width: width * 0.9
    },
    createPropertyButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#0288d1',
        borderRadius: 5,
        width: width * 0.9,
        alignItems: 'center'
    },
    textStyleButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    }
});

export default CreateProperty;