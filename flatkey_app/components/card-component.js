import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { image1,
         image2,
         image3,
         image4,
         image5,
         image6,
         image7,
         image8,
         image9,
         image10 } from "../assets/image/index";

function CardComponent(props) {
    const navigation = useNavigation();
    const { _id, address, area, landlord, price, rooms, title, type } = props.property;        
    const { isowner } = props.isowner;    

    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10
        ];
        
    const randomNumber = Math.floor(Math.random() * images.length);    

    return (        
        <View style={styles.container}>
            <View style={styles.header}>              
                <Image style={styles.picture} source={images[randomNumber]}/>              
            </View>
            <View style={styles.footer}>                           
                <Text style={styles.propertyTitleText}>Property:</Text>
                <Text style={styles.propertyText}>Title: {title}</Text>
                <Text style={styles.propertyText}>Price: {price}</Text>   

                <View style={styles.containerDetailsButton}>
                <TouchableHighlight style={styles.detailsButton} onPress={() =>
                        navigation.navigate('DetailsProperty', {
                            imageId: images[randomNumber],
                            address: address,
                            area: area,
                            price: price,
                            rooms: rooms,
                            title: title,
                            type: type,                            
                            landlord: landlord,
                            isowner: isowner
                        })}>
                        <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableHighlight>
                </View>             
                   
                <View style={styles.containerButtons}>
                    { !isowner ? null : 
                    <TouchableHighlight style={styles.updateButton} onPress={() =>
                        navigation.navigate('UpdateProperty', {
                            id: _id,
                            address: address,
                            area: area,
                            price: price,
                            rooms: rooms,
                            title: title,
                            type: type,                            
                            landlord: landlord,
                            isowner: isowner
                        })}>
                        <Text style={styles.updateButtonText}>Update</Text>
                    </TouchableHighlight>
                    }       
                    { !isowner ? 
                    <TouchableHighlight style={styles.reserveButton} onPress={() => {
                        Alert.alert("Reserve","Do you want to reserve this property?",
                            [
                                { text: 'Cancel', style: 'cancel', },
                                { text: 'OK', style: 'ok' },
                            ],
                            { cancelable: false });
                        }}>
                        <Text style={styles.reserveButtonText}>Reserve</Text>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight style={styles.deleteButton} onPress={() => {
                            navigation.navigate('DeleteProperty', {
                                id: _id,
                                address: address,
                                area: area,
                                price: price,
                                rooms: rooms,
                                title: title,
                                type: type,
                                landlord: landlord,
                                isowner: isowner
                            })
                        }}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableHighlight>                    
                    }                                                               
                </View>
            </View>	
            
        </View>
    );
};

const {height, width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,      
        backgroundColor : '#fff',  
        margin: 10,
        padding: 10,
        borderRadius: 5,
        marginBottom: 30
    },
    header: {
        flex: 1,
        justifyContent : 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingTop: 15
      },
      footer: {
        flex: 1,    
        backgroundColor : '#f1f1f1',
        borderRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 20
      },
    containerButtons: {
        flex: 1,
        flexDirection: "row",        
        top: 10, 
        left: width*0.45
    },
    propertyTitleText: {
        fontWeight: 'bold',
        fontSize: 19,
        alignItems: 'center',
        padding: 2,
        margin: 2
    },
    propertyText: {        
        fontSize: 18,
        alignItems: 'center',
        padding: 2,
        margin: 2
    },
    updateButton: {
        backgroundColor: '#03a9f4',
        padding: 1,
        margin: 1,
        alignItems: 'center',
        width: width * 0.2
    },
    updateButtonText: {
        color: 'white'
    },
    deleteButton: {
        backgroundColor: '#03a9f4',
        padding: 1,
        margin: 1,
        alignItems: 'center',
        width: width * 0.2
    },
    deleteButtonText: {
        color: 'white'
    },
    reserveButton: {
        backgroundColor: '#bd1e59',
        padding: 1,
        margin: 1,
        alignItems: 'center',
        width: width * 0.4,
    },
    reserveButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    containerDetailsButton: {
        flex: 1,
        flexDirection: "row",        
        top: 10, 
        left: width*0.7,
        position: 'absolute',
        right: 10,
        top: 10
    },
    detailsButton: {
        backgroundColor: '#bd1e59',
        padding: 1,
        margin: 1,
        alignItems: 'center',
        width: width * 0.2,        
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },    
    picture: { 
        width: width*0.84,
        height: height*0.3,
        borderRadius: 10,
    }

});

export default CardComponent;