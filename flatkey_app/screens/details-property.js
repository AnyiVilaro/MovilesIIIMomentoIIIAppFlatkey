import React from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image } from 'react-native';
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

function DetailsProperty({ route, navigation }) {
    const { imageId, address, area, landlord, price, rooms, title, type, isowner } = route.params;            

    return (
        <View style={styles.container}> 
            <View style={styles.header}>              
                <Image style={styles.picture} source={imageId}/>              
            </View>                         
            <Text style={styles.text}>Title: {title}</Text>
            <Text style={styles.text}>Type: {type}</Text>
            <Text style={styles.text}>Address: {address}</Text>
            <Text style={styles.text}>Rooms: {rooms}</Text>
            <Text style={styles.text}>Price: {price}</Text>
            <Text style={styles.text}>Area: {area}</Text>
            <Text style={styles.text}>Landlord: {landlord}</Text>
        </View>
    );
};

const {height, width} = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10,
        width: Dimensions.get('screen').width * 0.9
    },
    header: {
        justifyContent : 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingTop: 15
      },    
      picture: { 
          width: width*0.84,
          height: height*0.3,
          borderRadius: 10,
      }
});
export default DetailsProperty;	
