import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './screens/HomeScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import EatsScreen from './screens/EatsScreen';

export default function App() {
	const Stack = createStackNavigator();

	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<StatusBar style="dark" />
					<Stack.Navigator>
						<Stack.Screen
							name="HomeScreen"
							component={HomeScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="MapScreen"
							component={MapScreen}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="EatsScreen"
							component={EatsScreen}
							options={{
								headerShown: false,
							}}
						/>
					</Stack.Navigator>
					{/* <HomeScreen /> */}
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}
