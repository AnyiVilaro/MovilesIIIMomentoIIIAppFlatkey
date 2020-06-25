import React, { useState , useContext} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

function Login({ navigation }) {
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const [isValidEmail, setValidEmail] = useState(true);
    const [isValidPassword, setValidPassword] = useState(true);
    const [checkTextInputChange, setCheckTextInputChange] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    //email="anyivilaro@cesde.com.co";
    //password="123456";
    

    const getUser = async () => {   
        if ( email.length == 0 || password.length == 0 ) {
            Alert.alert('Error!', 'Username or password field cannot be empty.', [
                {text: 'OK'}
            ]);
            return;
        } 
        try {            
            const api_nodejs_mongo = "http://192.168.0.7:3000/api/user/validate"
            const response = await fetch(api_nodejs_mongo, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            }).catch((error) => { Alert.alert("An error has ocurred: " + error)});            
            const json = await response.json();    
            //console.log(json);
            if(json.res.success){                                
              navigation.navigate('ListProperties',{
                email: json.res.data[0].user.email,
                isowner: typeof json.res.data[0].user.isowner !== undefined ? json.res.data[0].user.isowner : false
              });
            }else{
              Alert.alert("Authentication Error",json.res.error.message);
            }
        } catch (error) {
            Alert.alert("An error has ocurred: " + error);            
        }
    }    

    // Validate TextIput email
    const textInputChange = (val) => {
        setEmail(val);
        /**
         * ^\w+ -> alfanumerico
         * ([\.-]?\w+)* -> Un punto ó un guion seguido de alfanumerico. Opcional.
         * @ -> Signo arroba
         * \w+ -> alfanumerico
         * ([\.-]?\w+)* -> Un punto ó un guion seguido de alfanumerico. Opcional.
         * (\.\w{2,3})+$ -> Un punto seguido de alfanumerico de 2 o 3 caracteres. String final. 
         */
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(val.length >= 4 && regex.test(val)){
            setValidEmail(true);            
            setCheckTextInputChange(true);            
        }else{
            setValidEmail(false);
            setCheckTextInputChange(false)
        }        
    }

    // actualizar la propiedad de campo Password. Si se muestra o no.
    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    const passwordValidate = (val) => {
        setPassword(val);
        if( val.trim().length >= 4 ) {
            setValidPassword(true);
        } else {
            setValidPassword(false);
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Bienvenido!</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <Feather
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Email" 
                    style={styles.textInput}
                    autoCapitalize="none" 
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e) =>  textInputChange(e.nativeEvent.text)}
                    />  
                    {checkTextInputChange != null ?                   
                    <Feather
                        name="check-circle"
                        color={checkTextInputChange ? "green" : "red" }
                        size={20}
                    /> : null}
                
            </View>
            { isValidEmail ? null : 
            <View>
                <Text style={styles.errorMsg}>Email must be valid.</Text>
            </View>
            }
            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Password" 
                    style={styles.textInput} 
                    autoCapitalize="none" 
                    secureTextEntry={secureTextEntry ? true : false}   
                    onChangeText={text => passwordValidate(text)}                 
                    />         
                <TouchableOpacity onPress={updateSecureTextEntry}>
                    {secureTextEntry ? 
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    : 
                    <Feather
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            { isValidPassword ? null : 
            <View>
                <Text style={styles.errorMsg}>Password must be 4 characters long.</Text>
            </View>
            }

            <View style={styles.button}>
                <TouchableHighlight style={styles.signIn} onPress={() => getUser()} underlayColor='transparent'>
                    <Text style={styles.textSignIn}>Sign in</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.signUp} onPress={() => navigation.navigate('CreateUser')} underlayColor='transparent'>
                    <Text style={styles.textSignUp}>Sign up</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.guest} onPress={() => navigation.navigate('ListProperties')} underlayColor='transparent'>
                    <Text style={styles.textGuest}>Guest</Text>
                </TouchableHighlight>

            </View>
        </View>
    </View>
  );
};

export default Login;

/**/
const {height, width} = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3897f1'
  },
  header: {
    flex: 1,
    justifyContent : 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,    
    backgroundColor : '#fff',
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color : '#fff',   
    fontWeight : 'bold',
    fontSize : 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 20,
    marginTop: 35
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom : 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1, // Mover iconos de campos
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    backgroundColor: '#3897f1',
    fontSize: 16,
    borderRadius: 5,
    height: 45,
    margin: 15,
    padding: 10,
    width: width * 0.93,
    alignItems: 'center'
  },
  signUp: {    
    height: 45,
    margin: 5,
    padding: 10,
    width: width * 0.93,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  guest: {    
    height: 45,
    margin: 5,
    padding: 10,
    width: width * 0.93,
    alignItems: 'center'
  },
  textSignIn: {
    fontSize: 20,
    fontWeight: 'bold' ,
    color: 'white'
  },
  textSignUp: {
    fontSize: 20,
    fontWeight: 'bold' ,
    color: '#3897f1'
  },
  textGuest: {
    fontSize: 18,
    color: '#3897f1'
  },
});

