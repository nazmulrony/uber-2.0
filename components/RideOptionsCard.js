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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../redux/slices/navReducer';

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
		multiplier: 1.4,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf',
	},
];

const ratePerMin = 3;
const ratePerKiloMeter = 21;
const baseRate = 60;

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);

	const price =
		(travelTimeInformation?.duration?.value / 60) * ratePerMin +
		(travelTimeInformation?.distance?.value / 1000) * ratePerKiloMeter;

	return (
		<SafeAreaView className="bg-white flex-grow">
			<View className="relative">
				<TouchableOpacity
					onPress={() => navigation.navigate('NavigateCard')}
					className="absolute top-3 left-5 p-3 rounded-full z-10"
				>
					<Ionicons name="chevron-back" size={24} color="black" />
				</TouchableOpacity>
				<Text className="text-center py-5 text-xl">
					Select a Ride -{' '}
					{travelTimeInformation?.distance?.value / 1000} km
				</Text>
			</View>
			<FlatList
				style={{ flex: 1 }}
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({
					item: { id, title, multiplier, image },
					item,
				}) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						className={`flex-row items-center justify-between  px-5 ${
							id === selected?.id && 'bg-gray-200'
						}  `}
					>
						<Image
							source={{ uri: image }}
							style={{
								width: 100,
								height: 100,
								resizeMode: 'contain',
							}}
						/>
						<View className="-ml-6">
							<Text className="text-lg font-medium">{title}</Text>
							<Text className="text-xs">
								{travelTimeInformation?.duration?.text} travel
								time
							</Text>
						</View>
						<Text className="text-lg font-medium">
							{new Intl.NumberFormat('en-bd', {
								style: 'currency',
								currency: 'BDT',
							}).format(baseRate + price * multiplier)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View className="mt-auto border-t border-gray-200">
				<TouchableOpacity
					disabled={!selected}
					className={`bg-black  py-3 mx-5 m-3 ${
						!selected && 'bg-gray-300'
					}`}
				>
					<Text className="text-center text-white text-xl">
						Choose {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
export default RideOptionsCard;
