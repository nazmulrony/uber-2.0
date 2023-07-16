import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../redux/slices/navReducer';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env';
import { useEffect, useRef } from 'react';
import { Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);

	useEffect(() => {
		if (!origin || !destination || !mapRef.current) return;
		// mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
		// 	edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
		// });
		mapRef.current.fitToCoordinates(
			[
				{
					latitude: origin.location.lat,
					longitude: origin.location.lng,
				},
				{
					latitude: destination.location.lat,
					longitude: destination.location.lng,
				},
			],
			{
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
				animated: true,
			}
		);
	}, [origin, destination]);

	return (
		<MapView
			ref={mapRef}
			className="flex-1"
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			}}
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
				>
					<MaterialIcons
						name="location-history"
						size={24}
						color="black"
					/>
				</Marker>
			)}
			{destination?.location && (
				<Marker
					pinColor="blue"
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				>
					<Ionicons name="location-sharp" size={24} color="black" />
				</Marker>
			)}
			{origin?.location && destination?.location && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_API_KEY}
					strokeColor="black"
					strokeWidth={5}
				/>
			)}
		</MapView>
	);
};
export default Map;
