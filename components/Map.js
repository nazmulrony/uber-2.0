import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../redux/slices/navReducer';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env';
import { useEffect, useRef } from 'react';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);

	useEffect(() => {
		if (!origin || !destination || !mapRef.current) return;
		console.log('Origin', origin);
		console.log('Destination', destination);
		//fitBounds
		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
		});
	}, [origin, destination, mapRef.current]);

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
			// zoomControlEnabled={true}
		>
			{origin?.location && (
				<Marker
					pinColor="black"
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					pinColor="black"
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
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
