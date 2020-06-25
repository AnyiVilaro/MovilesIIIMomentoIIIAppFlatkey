import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

function UpdateProperty({ route, navigation }) {    
    const { id, address, area, landlord, price, rooms, title, type, isowner } = route.params; 
    const [itemTitle, setItemTitle] = useState(title);   
    const [itemType, setItemType] = useState(type);   
    const [itemAddress, setItemAddress] = useState(address);   
    const [itemRooms, setItemRooms] = useState(rooms);   
    const [itemPrice, setItemPrice] = useState(price);   
    const [itemArea, setItemArea] = useState(area);   
    const [itemLandlord, setItemLandlord] = useState(landlord);   
    
    const updateProperty = async () => {

        if ( itemTitle.length == 0 || itemType.length == 0 || itemAddress.length == 0 || itemRooms.length == 0 || itemPrice.length == 0 || itemArea.length == 0) {
            Alert.alert('Wrong Input!', 'Fields cannot be empty.', [
                {text: 'OK'}
            ]);
            return;
        }

        try {
            const response = await fetch('http://192.168.0.7:3000/api/property/update/'+id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: itemAddress,
                    area: itemArea,
                    price: itemPrice,
                    rooms: itemRooms,
                    title: itemTitle,
                    type: itemType,                            
                    landlord: itemLandlord
                }),
            });
            const json = await response.json();
            Alert.alert("Property updated successfuly");
            navigation.navigate('ListProperties',{
                email: landlord,
                isowner: isowner
              });
        } catch (error) {
            Alert.alert("An error has ocurred: " + error);            
        }
    }


    return (
        <View style={styles.container}>            
            <TextInput style={styles.textInput} placeholder="Title" onChangeText={text => setItemTitle(text)}>{title}</TextInput>
            <TextInput style={styles.textInput} placeholder="Type" onChangeText={text => setItemType(text)} >{type}</TextInput>
            <TextInput style={styles.textInput} placeholder="Address" onChangeText={text => setItemAddress(text)} >{address}</TextInput>
            <TextInput style={styles.textInput} placeholder="Rooms" onChangeText={text => setItemRooms(text)} >{rooms}</TextInput>
            <TextInput style={styles.textInput} placeholder="Price" onChangeText={text => setItemPrice(text)} >{price}</TextInput>
            <TextInput style={styles.textInput} placeholder="Area" onChangeText={text => setItemArea(text)} >{area}</TextInput>


            <TouchableHighlight style={styles.createPropertyButton} onPress={updateProperty}>
                <Text style={styles.textStyleButton}>Update Property</Text>
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
    textInput: {
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
export default UpdateProperty;	