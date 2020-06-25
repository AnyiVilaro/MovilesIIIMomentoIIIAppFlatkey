import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Login from "./screens/login";
import CreateUser from "./screens/create-user";
import ListProperties from "./screens/list-property";
import CreateProperty from "./screens/create-property";
import UpdateProperty from "./screens/update-property";
import DeleteProperty from "./screens/delete-property";
import DetailsProperty from "./screens/details-property";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={ Login } options={{ title: 'Login' }} />
        <Stack.Screen name="CreateUser" component={ CreateUser} options={{ title: 'Create User' }} />
        
        <Stack.Screen name="ListProperties" component={ ListProperties } options={{ title: 'List Properties' }} />
        <Stack.Screen name="CreateProperty" component={ CreateProperty } options={{ title: 'Create Property' }} />
        <Stack.Screen name="UpdateProperty" component={ UpdateProperty } options={{ title: 'Update Property' }} />
        <Stack.Screen name="DeleteProperty" component={ DeleteProperty } options={{ title: 'Delete Property' }} />
        <Stack.Screen name="DetailsProperty" component={ DetailsProperty } options={{ title: 'Details Property' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;