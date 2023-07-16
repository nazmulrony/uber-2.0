import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	FlatList,
	Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
	{
		id: 'Uber-X-123',
		title: 'UberX',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn',
	},
	{
		id: 'Uber-L-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf',
	},
];

const RideOptionsCard = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView className="bg-white flex-grow">
			<View className="relative">
				<TouchableOpacity
					onPress={() => navigation.navigate('NavigateCard')}
					className="absolute top-3 left-5 p-3 rounded-full z-10"
				>
					<Ionicons name="chevron-back" size={24} color="black" />
				</TouchableOpacity>
				<Text className="text-center py-5 text-xl">Select a Ride</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item: { title, multiplier, image }, item }) => (
					<TouchableOpacity className="flex-row items-center justify-between px-10 ">
						<Image
							source={{ uri: image }}
							style={{
								width: 100,
								height: 100,
								resizeMode: 'contain',
							}}
						/>
						<View className="-ml-6">
							<Text className="text-xl font-semibold">
								{title}
							</Text>
							<Text>Travel time..</Text>
						</View>
						<Text className="text-xl">$40.00</Text>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};
export default RideOptionsCard;
