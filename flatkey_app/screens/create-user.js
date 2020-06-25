import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, CheckBox } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

function CreateUsers({ navigation }) {
    const [isSelected, setSelection] = useState(false);
    const [isValidEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState(true);
    const [data, setData] = useState({
        name: '',
        lastname: '',
        password: ''
    });
    
    const createUser = async () => {

        if ( data.name.length == 0 || email.length == 0 || data.lastname.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Fields cannot be empty.', [
                {text: 'OK'}
            ]);
            return;
        }

        try {
            const response = await fetch('http://192.168.0.7:3000/api/user/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    lastname: data.lastname,
                    email: email,
                    password: data.password,
                    isowner: isSelected
                }),
            }).catch((error) => { Alert.alert("An error has ocurred: " + error)});            
            const json = await response.json();
            if(json.res.success){                
                Alert.alert("Success","User created successfuly", [{
                    text: 'OK'
                }]);
                navigation.navigate('Login');
            }else{
              Alert.alert("Creation Error",json.res.error.message);
            }
            console.log(json);            
        } catch (error) {
            Alert.alert("An error has ocurred: " + error);
        }
    }

    // Validate TextIput email
    const textInputChange = (val) => {
        setEmail(val);
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(val.length >= 4 && regex.test(val)){
            setValidEmail(true);        
        }else{
            setValidEmail(false);
        }        
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign up</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} placeholder="Name" onChangeText={text => setData({...data,name: text})} />
                </View>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} placeholder="Lastname" onChangeText={text => setData({...data,lastname: text})} />
                </View>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={text => textInputChange(text)} />
                </View>
                { isValidEmail ? null : 
                <View>
                    <Text style={styles.errorMsg}>Email must be valid.</Text>
                </View>
                }
                <View style={styles.action}>
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={text => setData({...data,password: text})} />
                </View>
                <View style={styles.action}>
                    <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                    />
                    <Text style={styles.label}>Do you want to sign up as a owner?</Text>
                </View>                
                <View style={styles.button}>
                    <TouchableHighlight style={styles.createUserButton} onPress={() => createUser()} underlayColor='transparent'>
                        <Text style={styles.textStyleButton}>Create User</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3897f1'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    footer: {
        flex: 9,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 20,
        marginTop: 35
    },
    textInput: {
        marginTop: 0,
        paddingLeft: 10,
        color: '#05375a',
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 5,
        borderColor: '#fff',
        width: width * 0.9
    },
    createUserButton: {
        backgroundColor: '#3897f1',
        fontSize: 16,
        borderRadius: 5,
        height: 45,
        margin: 15,
        padding: 10,
        width: width * 0.9,
        alignItems: 'center'
    },
    textStyleButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
        color: "#05375a"
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
});

export default CreateUsers;