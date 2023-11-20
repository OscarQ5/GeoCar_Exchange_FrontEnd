import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;
const RADAR_API_KEY = import.meta.env.VITE_RADAR_API_KEY;

export default function CarDetails() {
    const [car, setCar] = useState({});
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [carLocation, setCarLocation] = useState(null);
    const [distance, setDistance] = useState(null);

    const navigate = useNavigate();
    let { id } = useParams();

    const fetchCar = async () => {
        try {
            fetch(`${API}/cars/${id}`)
                .then(res => res.json())
                .then(data => {
                    setCar(data)
                    setLoading(false)
                })
        } catch (err) {
            return err;
        }
    };

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (err) => { console.error(err); }
            );
        } else {
            console.log('Geolocation is not supported in this browser.');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchCar();
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            getUserLocation();
            if (car.location) {
                getCoordinatesFromAddress(car.location);
            }
        };

        fetchData();
    }, [car]);

    const getCoordinatesFromAddress = (address) => {
        const apiUrl = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`;

        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `${RADAR_API_KEY}`,
            },
        })
            .then(r => r.json())
            .then((data) => {
                if (data.addresses && data.addresses.length > 0) {
                    const coordinates = data.addresses[0].geometry.coordinates
                    setCarLocation(coordinates)
                } else {
                    console.error("No coordinates found for the address")
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (userLocation && carLocation) {
            calculateDistance(userLocation, carLocation);
        }
    }, [userLocation, carLocation]);

    const calculateDistance = (userLocation, carLocation) => {
        const R = 6371;

        const userLat = userLocation.lat;
        const userLng = userLocation.lng;

        let carLat, carLng;

        if (Array.isArray(carLocation)) {
            [carLng, carLat] = carLocation;
        } else {
            carLat = carLocation.lat;
            carLng = carLocation.lng;
        }

        const dLat = deg2rad(carLat - userLat);
        const dLon = deg2rad(carLng - userLng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(carLat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        setDistance(distance);
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    }



    const handleDelete = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this car?");
        if (isConfirmed) {
            try {
                fetch(`${API}/cars/${id}`, { method: "DELETE" })
                    .then(() => navigate("/cars"))
            } catch (err) {
                return err;
            }
        }
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className="section">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                        <img
                            src={`https://geocar-exchange-backend.onrender.com${car.image_url}`}
                            alt={`Car: ${car.make} ${car.model}`}
                            style={{ maxWidth: '50%', height: 'auto', marginRight: '20px' }}
                        />
                        <div className="content">
                            <h3 className="title is-5">
                                Make: {car.make}<br /><br />
                                Model: {car.model}<br /><br />
                                Year: {car.year}<br /><br />
                                Price: {formatCurrency(parseFloat(car.price))}<br /><br />
                                Color: {car.color}<br /><br />
                                Mileage: {parseFloat(car.mileage).toLocaleString()}<br /><br />
                                Condition: {car.condition}<br /><br />
                                Location: {car.location}<br /><br />
                                Favorite: {car.is_favorite ? <span>⭐️</span> : <span>❌</span>}<br /><br />
                                For Sale: {car.for_sale ? <span>✅</span> : <span>❌</span>}
                            </h3>
                        </div>
                        <div className="buttons">
                            <Link to={`/cars`}>
                                <button className="button is-info">Back</button>
                            </Link>
                            <Link to={`/cars/${id}/edit`}>
                                <button className="button is-primary">Edit</button>
                            </Link>
                            <button className="button is-danger" onClick={handleDelete}>Delete</button>
                        </div>
                        {distance !== null ? (
                            <div style={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                background: "rgba(255, 255, 255, 0.8)",
                                padding: "5px",
                                borderRadius: "5px",
                                fontSize: "1.2em",
                                fontWeight: "bold",
                            }}>
                                Distance: {distance.toFixed(2)} miles
                            </div>
                        ) : (
                            <div style={{
                                position: "absolute",
                                top: "10px", 
                                left: "10px", 
                                background: "rgba(255, 255, 255, 0.8)",
                                padding: "5px",
                                borderRadius: "5px",
                                fontSize: "1.2em",
                                fontWeight: "bold",
                            }}>
                                Calculating distance...
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>

    )
}