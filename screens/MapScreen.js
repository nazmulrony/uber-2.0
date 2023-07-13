import { StyleSheet, Text, View } from 'react-native';
import Map from '../components/Map';
const MapScreen = () => {
	return (
		<View style={styles.screen}>
			<View className="h-1/2 ">
				<Map />
			</View>
			<View className="h-1/2 "></View>
		</View>
	);
};
export default MapScreen;
const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
