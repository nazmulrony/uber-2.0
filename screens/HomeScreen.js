import {
	View,
	Text,
	SafeAreaView,
	Platform,
	StatusBar,
	StyleSheet,
	Image,
} from 'react-native';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/navReducer';

const HomeScreen = () => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={styles.screen}>
			<View className="p-5">
				<Image
					source={{ uri: 'https://links.papareact.com/gzs' }}
					style={styles.logo}
				/>
				<GooglePlacesAutocomplete
					placeholder="Where From?"
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						console.log(data);
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);
						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					returnKeyType="search"
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					query={{
						key: GOOGLE_API_KEY,
						language: 'en',
					}}
					minLength={2}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={300}
				/>
				<NavOptions />
			</View>
		</SafeAreaView>
	);
};
export default HomeScreen;
const styles = StyleSheet.create({
	screen: {
		paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
		backgroundColor: 'white',
		flex: 1,
	},
	logo: {
		height: 100,
		width: 100,
		resizeMode: 'contain',
		backgroundColor: 'white',
	},
});
