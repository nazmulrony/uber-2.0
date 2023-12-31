import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from '../redux/slices/navReducer';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from '@env';
import { useEffect, useRef } from 'react';
import { Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	//this useEffect sets the markers visible in the map window
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

	//to calculate distance
	useEffect(() => {
		if (!origin || !destination) return;

		const getTravelTime = async () => {
			fetch(`https://maps.googleapis.com/maps/api/distancematrix/json
			?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_API_KEY}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					dispatch(
						setTravelTimeInformation(data?.rows[0]?.elements[0])
					);
				});
		};
		getTravelTime();
	}, [origin, destination, GOOGLE_API_KEY]);
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
			// style={}
			showsMyLocationButton={true}
			showsUserLocation={true}
			// zoomControlEnabled={true}
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
					{destination?.location ? (
						<FontAwesome name="circle" size={18} color="black" />
					) : (
						<Ionicons name="md-location" size={24} color="black" />
					)}
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
					<Ionicons name="md-location" size={24} color="black" />
				</Marker>
			)}
			{origin?.location && destination?.location && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_API_KEY}
					strokeColor="black"
					// strokeColor="#4CAF50"
					strokeWidth={4}
				/>
			)}
		</MapView>
	);
};
export default Map;
