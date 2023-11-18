import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const defaultCarImage = "http://localhost:5555/static/CAR_DEFAULT.jpg";

export default function NewCarForm() {
    const navigate = useNavigate();
    const [car, setCar] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        color: "",
        mileage: "",
        condition: "",
        location: "",
        image_url: "",
        is_favorite: false,
    });

    const addCar = () => {
        try {
            const carData = {
                ...car,
                image_url: car.image_url || defaultCarImage,
            }
            fetch(`${API}/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carData)
            })
                .then(() => navigate("/cars"))
        } catch (err) {
            return err;
        }
    };

    const handleText = e => setCar({ ...car, [e.target.id]: e.target.value });
    const handleCheckbox = () => setCar({ ...car, is_favorite: !car.is_favorite });
    const handleSubmit = e => {
        e.preventDefault();
        addCar();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="make">Make:</label>
                <input
                    id="make"
                    value={car.make}
                    type="text"
                    onChange={handleText}
                    placeholder="Make"
                    required
                />
                <br />

                <label htmlFor="model">Model:</label>
                <input
                    id="model"
                    value={car.model}
                    type="text"
                    onChange={handleText}
                    placeholder="Model"
                    required
                />
                <br />

                <label htmlFor="year">Year:</label>
                <input
                    id="year"
                    value={car.year}
                    type="number"
                    onChange={handleText}
                    placeholder="Year"
                    required
                />
                <br />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    value={car.price}
                    type="number"
                    onChange={handleText}
                    placeholder="Price"
                    required
                />
                <br />

                <label htmlFor="color">Color:</label>
                <input
                    id="color"
                    value={car.color}
                    type="text"
                    onChange={handleText}
                    placeholder="Color"
                />
                <br />

                <label htmlFor="mileage">Mileage:</label>
                <input
                    id="mileage"
                    value={car.mileage}
                    type="number"
                    onChange={handleText}
                    placeholder="Mileage"
                />
                <br />

                <label htmlFor="condition">Condition:</label>
                <input
                    id="condition"
                    value={car.condition}
                    type="text"
                    onChange={handleText}
                    placeholder="New, Used or Certified"
                />
                <br />

                <label htmlFor="location">Location:</label>
                <input
                    id="location"
                    value={car.location}
                    type="text"
                    onChange={handleText}
                    placeholder="Location"
                    required
                />
                <br />

                <label htmlFor="image_url">Image URL:</label>
                <input
                    id="image_url"
                    value={car.image_url}
                    type="text"
                    onChange={handleText}
                    placeholder="Image URL"
                />
                <br />

                <label htmlFor="is_favorite">Favorite:</label>
                <input
                    id="is_favorite"
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={car.is_favorite}
                />
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
            <br />
            <Link to={`/cars`}>
                <button>Back</button>
            </Link>
        </div>
    )
}