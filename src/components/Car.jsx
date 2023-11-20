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
                <Link to={`/cars/${car.id}`} className="has-text-link"> {car.model}</Link>
            </td>
            <td>
                <span className="has-text-weight-bold">{car.make}</span>
            </td>
            <td>
                <span>
                    <span className="has-text-grey">{car.year}</span>
                </span>
            </td>
            <td>
                {car.for_sale ? (
                    <span>✅</span>
                ) : (
                    <span>&nbsp; &nbsp; &nbsp;</span>
                )}
            </td>
        </tr>
    )
}