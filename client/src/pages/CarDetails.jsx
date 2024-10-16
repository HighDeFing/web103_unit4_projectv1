import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { getCarById, getExterior, getRoof, getWheels, getInterior, deleteCarById } from '../../services/CarsAPI.jsx'
import '../css/CarDetails.css'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [exteriorOptions, setExteriorOptions] = useState([])
    const [roofOptions, setRoofOptions] = useState([])
    const [wheelsOptions, setWheelsOptions] = useState([])
    const [interiorOptions, setInteriorOptions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carData = await getCarById(id)
                const exteriorData = await getExterior()
                const roofData = await getRoof()
                const wheelsData = await getWheels()
                const interiorData = await getInterior()

                setCar(carData)
                setExteriorOptions(exteriorData)
                setRoofOptions(roofData)
                setWheelsOptions(wheelsData)
                setInteriorOptions(interiorData)
            } catch (error) {
                console.error('Error fetching car details:', error)
            }
        }

        fetchData()
    }, [id])

    const handleDelete = async () => {
        try {
            await deleteCarById(id)
            navigate('/customcars')
        } catch (error) {
            console.error('Error deleting car:', error)
        }
    }

    if (!car) {
        return <p>Loading...</p>
    }

    const getImagePath = (options, id, type) => {
        const item = options.find(item => item.id === id)
        return item ? `http://localhost:3000/data/img/${type}/${item.image}` : ''
    }

    return (
        <div className="container">
            <article className="card">
                <header>
                    <h3>{car.name}</h3>
                    <div className="price-container">
                        <p>Price: ${car.price}</p>
                    </div>
                </header>
                <p>Exterior: {exteriorOptions.find(item => item.id === car.exterior)?.name || 'Unknown'}</p>
                <img src={getImagePath(exteriorOptions, car.exterior, 'exterior')} alt={exteriorOptions.find(item => item.id === car.exterior)?.name || 'Unknown'} />
                <p>Roof: {roofOptions.find(item => item.id === car.roof)?.name || 'Unknown'}</p>
                <img src={getImagePath(roofOptions, car.roof, 'roof')} alt={roofOptions.find(item => item.id === car.roof)?.name || 'Unknown'} />
                <p>Wheels: {wheelsOptions.find(item => item.id === car.wheels)?.name || 'Unknown'}</p>
                <img src={getImagePath(wheelsOptions, car.wheels, 'wheels')} alt={wheelsOptions.find(item => item.id === car.wheels)?.name || 'Unknown'} />
                <p>Interior: {interiorOptions.find(item => item.id === car.interior)?.name || 'Unknown'}</p>
                <img src={getImagePath(interiorOptions, car.interior, 'interior')} alt={interiorOptions.find(item => item.id === car.interior)?.name || 'Unknown'} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={`/edit/${car.id}`} className="button"><button>Edit</button></Link>
                    <button onClick={handleDelete} className="button">Delete</button>
                </div>
            </article>
        </div>
    )
}

export default CarDetails