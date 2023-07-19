import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';

const MapScreen = ({ navigation }) => {
	const Stack = createStackNavigator();
	return (
		<View style={styles.screen}>
			<TouchableOpacity
				onPress={() => navigation.navigate('HomeScreen')}
				className="absolute top-16 left-8 z-10 bg-gray-100 p-3 rounded-full "
			>
				<Icon name="menu" />
			</TouchableOpacity>
			<View className="h-1/2 ">
				<Map />
			</View>
			<View className="h-1/2 ">
				<Stack.Navigator
					screenOptions={{
						gestureEnabled: true,
					}}
				>
					<Stack.Screen
						name="NavigateCard"
						component={NavigateCard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RideOptionsCard"
						component={RideOptionsCard}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</View>
		</View>
	);
};
export default MapScreen;
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
