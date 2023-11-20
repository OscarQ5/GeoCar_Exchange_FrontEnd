import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

export default function CarDetails() {
    const [car, setCar] = useState({});
    const [loading, setLoading] = useState(true);
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

    useEffect(() => { fetchCar() }, [id]);

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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={`https://geocar-exchange-backend.onrender.com${car.image_url}`}
                            alt={`Car: ${car.make} ${car.model}`}
                            style={{ maxWidth: '50%', height: 'auto', marginRight: '20px' }}
                        />
                        <div className="content">
                            <h3 className="title is-3">
                                Make: {car.make}<br />
                                Model: {car.model}<br />
                                Year: {car.year}<br />
                                Price: {formatCurrency(parseFloat(car.price))}<br />
                                Color: {car.color}<br />
                                Mileage: {parseFloat(car.mileage).toLocaleString()}<br />
                                Condition: {car.condition}<br />
                                Location: {car.location}<br />
                                Favorite: {car.is_favorite ? <span>⭐️</span> : <span>❌</span>}
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
                    </div>
                </>
            )}
        </div>

    )
}