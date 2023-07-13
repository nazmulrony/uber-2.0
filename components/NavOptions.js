import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../redux/slices/navReducer';

const data = [
	{
		id: '123',
		title: 'Get a ride',
		image: 'https://links.papareact.com/3pn',
		screen: 'MapScreen',
	},
	{
		id: '456',
		title: 'Order food',
		image: 'https://links.papareact.com/28w',
		screen: 'EatsScreen',
	},
];

const NavOptions = () => {
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);
	return (
		<FlatList
			className="w-full "
			contentContainerStyle={{
				flex: 1,
				justifyContent: 'space-between',
			}}
			data={data}
			horizontal
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() => navigation.navigate(item.screen)}
					className="p-2 pl-6 pb-8 bg-gray-200 "
					disabled={!origin}
				>
					<View className={!origin && 'opacity-30'}>
						<Image
							source={{ uri: item.image }}
							style={{
								height: 120,
								width: 120,
								resizeMode: 'contain',
							}}
						/>
						<Text className="text-lg font-semibold mt-2 ">
							{item.title}
						</Text>
						<Icon
							className="bg-black p-2 w-10 rounded-full mt-4"
							name="arrowright"
							color="white"
							type="antdesign"
						/>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};
export default NavOptions;
