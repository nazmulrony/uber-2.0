import { SafeAreaView, StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../redux/slices/navReducer';
import { useNavigation } from '@react-navigation/native';
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
