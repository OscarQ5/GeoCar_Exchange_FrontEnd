import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function CarEditForm() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [car, setCar] = useState({
        make: "",
        model: "",
        year: null,
        price: null,
        color: "",
        mileage: null,
        condition: "",
        location: "",
        image_url: "",
        is_favorite: false,
    });

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`${API}/cars/${id}`);
                if (response.ok) {
                    const carDetails = await response.json();
                    setCar({
                        ...carDetails,
                        image_url: carDetails.image_url || "/static/CAR_DEFAULT.jpg",
                    });
                    setLoading(false)
                } else {
                    console.error("Car not found");
                }
            } catch (err) {
                console.error("Error fetching car details:", err);
            }
        }

        fetchCarDetails();
    }, [id]);

    const handleText = e => setCar({ ...car, [e.target.id]: e.target.value });
    const handleCheckbox = () => setCar({ ...car, is_favorite: !car.is_favorite });

    const updateCar = async () => {
        try {
            const response = await fetch(`${API}/cars/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            });

            if (response.ok) {
                navigate(`/cars/${id}`);
            } else {
                console.error("Error updating car details");
            }
        } catch (err) {
            console.error("Error updating car details:", err);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateCar();
    };

    return (
        <div className="container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label" htmlFor="make">Make:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="make"
                                value={car.make}
                                type="text"
                                onChange={handleText}
                                placeholder="Make"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="model">Model:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="model"
                                value={car.model}
                                type="text"
                                onChange={handleText}
                                placeholder="Model"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="year">Year:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="year"
                                value={car.year}
                                type="number"
                                onChange={handleText}
                                placeholder="Year"
                                min="1900"
                                max="2024"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="price">Price:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="price"
                                value={car.price}
                                type="number"
                                onChange={handleText}
                                placeholder="Price"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="color">Color:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="color"
                                value={car.color}
                                type="text"
                                onChange={handleText}
                                placeholder="Color"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="mileage">Mileage:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="mileage"
                                value={car.mileage}
                                type="number"
                                onChange={handleText}
                                placeholder="Mileage"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="condition">Condition:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="condition"
                                value={car.condition}
                                type="text"
                                onChange={handleText}
                                placeholder="New, Used or Certified"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="location">Location:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="location"
                                value={car.location}
                                type="text"
                                onChange={handleText}
                                placeholder="Location"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="image_url">Image URL:</label>
                        <div className="control">
                            <input
                                className="input"
                                id="image_url"
                                value={car.image_url}
                                type="text"
                                onChange={handleText}
                                placeholder="Image URL"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="is_favorite">Favorite:</label>
                        <div className="control">
                            <label className="checkbox">
                                <input
                                    id="is_favorite"
                                    type="checkbox"
                                    onChange={handleCheckbox}
                                    checked={car.is_favorite}
                                />
                                Mark as Favorite
                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-primary" type="submit">Submit</button>
                        </div>
                        <div className="control">
                            <Link to={`/cars/${id}`} className="button is-link">Back</Link>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}