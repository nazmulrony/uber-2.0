import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const data = [
	{
		id: '123',
		icon: 'home',
		location: 'Home',
		destination: 'Code Street, London, UK',
	},
	{
		id: '456',
		icon: 'briefcase',
		location: 'Work',
		destination: 'London Eye, London, UK',
	},
];

const NavFavourites = () => {
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View style={{ height: 0.5 }} className="bg-gray-200" />
			)}
			renderItem={({ item: { location, destination, icon } }) => (
				<TouchableOpacity className="flex-row items-center p-5">
					<View className="p-3 bg-gray-300 rounded-full mr-4">
						<Entypo name={icon} size={18} color="white" />
					</View>
					<View>
						<Text className="font-semibold text-lg">
							{location}
						</Text>
						<Text>{destination}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};
export default NavFavourites;
const styles = StyleSheet.create({});
