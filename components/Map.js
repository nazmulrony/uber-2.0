import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../redux/slices/navReducer';
const Map = () => {
	const origin = useSelector(selectOrigin);

	return (
		<MapView
			className="flex-1"
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
			zoomControlEnabled
		>
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
		</MapView>
	);
};
export default Map;
