import { Link } from "react-router-dom";

export default function Car({ car }) {
    return (
        <tr>
            <td>
                {car.is_favorite ? (
                    <span>⭐️</span>
                ) : (
                    <span>&nbsp; &nbsp; &nbsp;</span>
                )}
            </td>
            <td>
                <Link to={`/cars/${car.id}`}> {car.model}</Link>
            </td>
            <td>
                {car.make}
            </td>
            <td>
                <span>
                    {car.year}
                </span>
            </td>
        </tr>
    )
}