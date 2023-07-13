import { StyleSheet, Text, View } from 'react-native';
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
const MapScreen = () => {
	const Stack = createStackNavigator();
	return (
		<View style={styles.screen}>
			<View className="h-1/2 ">
				<Map />
			</View>
			<View className="h-1/2 ">
				<Stack.Navigator screenOptions={{ gestureEnabled: true }}>
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
