import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../redux/slices/navReducer';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Text className="text-center py-5 text-xl">Hello, User</Text>
			<View className="border-t border-gray-200 flex-shrink">
				<View>
					<GooglePlacesAutocomplete
						placeholder="Where To?"
						styles={inputBoxStyle}
						fetchDetails={true}
						onPress={(data, details = null) => {
							dispatch(
								setDestination({
									location: details.geometry.location,
									description: data.description,
								})
							);
							navigation.navigate('RideOptionsCard');
						}}
						enablePoweredByContainer={false}
						returnKeyType="search"
						minLength={2}
						query={{
							key: GOOGLE_API_KEY,
							language: 'en',
						}}
					/>
				</View>
				<NavFavourites />
			</View>
			<View className="flex-row items-center  bg-white justify-evenly py-2 mt-auto border-t border-gray-100  pb-2">
				<TouchableOpacity
					onPress={() => navigation.navigate('RideOptionsCard')}
					className="w-24 bg-black flex flex-row justify-between items-center rounded-full px-4 py-3"
				>
					<FontAwesome name="car" color="white" size={16} />

					<Text className=" text-white text-center">Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity className="w-24 flex flex-row items-center justify-between rounded-full px-4 py-3">
					<Ionicons
						name="fast-food-outline"
						color="black"
						size={16}
					/>

					<Text className=" text-center">Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
export default NavigateCard;

const inputBoxStyle = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: '#f0f0f0',
		borderRadius: 0,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
	row: {
		paddingHorizontal: 20,
	},
});
