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
        try {
            fetch(`${API}/cars/${id}`, { method: "DELETE" })
                .then(() => navigate("/cars"))
        } catch (err) {
            return err;
        }
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>
                        Make: {car.make}<br />
                        Model: {car.model}<br />
                        Year: {car.year}<br />
                        Price: {car.price}<br />
                        Color: {car.color}<br />
                        Mileage: {car.mileage}<br />
                        Condition: {car.condition}<br />
                        Location: {car.location}<br />
                        Favorite: {car.is_favorite ? <span>⭐️</span> : <span>❌</span>}
                    </h3>
                    <div>
                        {" "}
                        <Link to={`/cars`}>
                            <button>Back</button>
                        </Link>
                    </div>
                    <div>
                        {" "}
                        <Link to={`/cars/${id}/edit`}>
                            <button>Edit</button>
                        </Link>
                    </div>
                    <div>
                        {" "}
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>

    )
}