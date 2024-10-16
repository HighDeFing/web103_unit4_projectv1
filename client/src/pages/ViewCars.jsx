import React, { useState, useEffect } from 'react'
import '../App.css'
import '../css/ViewCars.css'
import { getAllCars, getExterior, getRoof, getWheels, getInterior } from '../../services/CarsAPI.jsx'
import { Link } from 'react-router-dom'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [exterior, setExterior] = useState([])
    const [roof, setRoof] = useState([])
    const [wheels, setWheels] = useState([])
    const [interior, setInterior] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carsData = await getAllCars()
                const exteriorData = await getExterior()
                const roofData = await getRoof()
                const wheelsData = await getWheels()
                const interiorData = await getInterior()

                setCars(carsData)
                setExterior(exteriorData)
                setRoof(roofData)
                setWheels(wheelsData)
                setInterior(interiorData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const getExteriorById = (id) => exterior.find(item => item.id === id)
    const getRoofById = (id) => roof.find(item => item.id === id)
    const getWheelsById = (id) => wheels.find(item => item.id === id)
    const getInteriorById = (id) => interior.find(item => item.id === id)

    return (
        <div className="container">
            {cars.length > 0 ? (
                <div>
                    {cars.map((car) => (
                        <article key={car.id} className="card">
                            <header>
                                <h3>{car.name}</h3>
                                <div>
                                    <p>Price: ${car.price}</p>
                                </div>
                            </header>
                            <div>
                                <p>{getExteriorById(car.exterior)?.name || 'Unknown'}</p>
                                <img
                                    src={`http://localhost:3000/data/img/exterior/${getExteriorById(car.exterior)?.image}`}
                                    alt={getExteriorById(car.exterior)?.name}/>
                            </div>
                            <div>
                                <p>{getRoofById(car.roof)?.name || 'Unknown'}</p>
                                <img src={`http://localhost:3000/data/img/roof/${getRoofById(car.roof)?.image}`}
                                     alt={getRoofById(car.roof)?.name}/>
                            </div>
                            <div>
                                <p>{getWheelsById(car.wheels)?.name || 'Unknown'}</p>
                                <img src={`http://localhost:3000/data/img/wheels/${getWheelsById(car.wheels)?.image}`}
                                     alt={getWheelsById(car.wheels)?.name}/>
                            </div>
                            <div>
                                <p>{getInteriorById(car.interior)?.name || 'Unknown'}</p>
                                <img
                                    src={`http://localhost:3000/data/img/interior/${getInteriorById(car.interior)?.image}`}
                                    alt={getInteriorById(car.interior)?.name}/>
                            </div>

                            <Link to={`/customcars/${car.id}`} className="button">
                                <button>Details</button>
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                <p>No cars available</p>
            )}
        </div>
    )
}

export default ViewCars