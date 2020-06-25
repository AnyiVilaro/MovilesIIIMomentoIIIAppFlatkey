import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableHighlight, FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import CardComponent from '../components/card-component'

function ListProperties({ route, navigation }) {     
    var email = '';
    var isowner = false;
    var endpoint = '';
    if (route.params) {
       var { email, isowner } = route.params;            
    }
    //const email = "anyivilaro@cesde.com.co"
    //const isowner = true;
    const isFocused = useIsFocused();
    const [properties, setProperties] = useState([]);  
    let propertiesFound = false;

    function sortProperties(){
        endpoint = 'listSorted';
        fetchProperties();
        navigation.navigate('ListProperties');
    }

    /* Data for the flatlist */
    const fetchProperties = async () => {            
        if(email == "" && endpoint == ''){            
            endpoint = 'list';
        }else if(endpoint == ''){ 
            endpoint = 'listByUser?email='+email;
        }

        if(email != "" && endpoint == 'listSorted'){
            endpoint = 'listSortedByUser?email='+email;
        }
        
        let response = await fetch('http://192.168.0.7:3000/api/property/'+endpoint).catch((error) => {
             Alert.alert("Network Error","An error has ocurred: " + error);
            });        
        let json = await response.json();
        if(json.res.success){                                   
            setProperties(json.res.data[0]);                
            propertiesFound = true;
        }else{
            propertiesFound = false;
        }
    }   
    
    useEffect(() => {
        fetchProperties();
    }, [isFocused]);          

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.sortButton} onPress={() => {sortProperties()} } >
                <Text style={styles.sortButtonText}>Sort</Text>
            </TouchableHighlight>
            { !isowner ? null :         
            <TouchableHighlight style={styles.createPropertyButton} onPress={() =>
                navigation.navigate('CreateProperty', {
                    email: email,
                    isowner: isowner
                })}>
                <Text style={styles.createPropertyButtonText}>Create New</Text>
            </TouchableHighlight>
            }
            <FlatList
                data={properties}
                renderItem={({ item }) => <CardComponent property={item} isowner={{"isowner": isowner}}/>}
                keyExtractor={item => item._id}
            />            
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    createPropertyButton: {
        backgroundColor: '#0288d1',
        padding: 20,
        margin: 10,
        alignItems: 'center',
    },
    createPropertyButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    sortButton: {
        backgroundColor: '#0288d1',
        padding: 20,
        margin: 10,
        alignItems: 'center',
    },
    sortButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    title: {
        fontSize: 16,
        color: '#000'
    },
});


export default ListProperties;
