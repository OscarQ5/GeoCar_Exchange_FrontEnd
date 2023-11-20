import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const defaultCarImage = "/static/CAR_DEFAULT.jpg";

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
        for_sale: true,
    });

    const addCar = async () => {
        try {
            const year = parseInt(car.year);
            if (year < 1900 || year > 2024) {
                alert("Please enter a valid year between 1900 and 2024.");
                return;
            }

            const carData = {
                ...car,
                image_url: car.image_url || defaultCarImage,
            }

            const response = await fetch(`${API}/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                const newCar = await response.json();
                const newCarUrl = `/cars/${newCar.id}`;
                navigate(newCarUrl);
            } else {
                console.error("Failed to add car:", response.statusText);
            }
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
        <div className="section">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label" htmlFor="make">Make:</label>
                    <div className="control">
                        <input
                            id="make"
                            className="input"
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
                            id="model"
                            className="input"
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
                            id="year"
                            className="input"
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
                            id="price"
                            className="input"
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
                            id="color"
                            className="input"
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
                            id="mileage"
                            className="input"
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
                            id="condition"
                            className="input"
                            value={car.condition}
                            type="text"
                            onChange={handleText}
                            placeholder="New, Used, or Certified"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="location">Location:</label>
                    <div className="control">
                        <input
                            id="location"
                            className="input"
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
                            id="image_url"
                            className="input"
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
                            &nbsp; Mark as Favorite
                        </label>
                    </div>
                </div>

                <div className="field">
                    <label className="label" htmlFor="for_sale">For Sale:</label>
                    <div className="control">
                        <label className="checkbox">
                            <input
                                id="for_sale"
                                type="checkbox"
                                onChange={handleCheckbox}
                                checked={car.for_sale}
                            />
                            &nbsp; Mark For Sale
                        </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-primary">Submit</button>
                    </div>
                    <div className="control">
                        <Link to={`/cars`} className="button is-link">Back</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}