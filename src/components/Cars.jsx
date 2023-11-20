import { useEffect, useState } from "react";
import Car from "./Car.jsx";

const API = import.meta.env.VITE_API_URL;

export default function Cars() {
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        try {
            fetch(`${API}/cars`)
                .then(res => res.json())
                .then(data => setCars(data))
        } catch (err) {
            return err;
        }
    };

    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <div className="section">
            <h2 className="title">Car List</h2>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Favorite</th>
                        <th>Model</th>
                        <th>Make</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => <Car key={car.id} car={car} />)}
                </tbody>
            </table>
        </div>
    )
}