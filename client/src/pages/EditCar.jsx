import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import { getCarById, getExterior, getRoof, getWheels, getInterior, updateCarById } from '../../services/CarsAPI.jsx'
import '../css/EditCar.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [exteriorOptions, setExteriorOptions] = useState([])
    const [roofOptions, setRoofOptions] = useState([])
    const [wheelsOptions, setWheelsOptions] = useState([])
    const [interiorOptions, setInteriorOptions] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

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
                calculateTotalPrice(carData, exteriorData, roofData, wheelsData, interiorData)
            } catch (error) {
                console.error('Error fetching car details:', error)
            }
        }

        fetchData()
    }, [id])

    const calculateTotalPrice = (car, exteriorData, roofData, wheelsData, interiorData) => {
        const exteriorPrice = exteriorData.find(item => String(item.id) === String(car.exterior))?.price || 0
        console.log(exteriorPrice)
        const roofPrice = roofData.find(item => String(item.id) === String(car.roof))?.price || 0
        const wheelsPrice = wheelsData.find(item => String(item.id) === String(car.wheels))?.price || 0
        const interiorPrice = interiorData.find(item => String(item.id) === String(car.interior))?.price || 0
        setTotalPrice(exteriorPrice + roofPrice + wheelsPrice + interiorPrice)
    }
    const handlePartChange = (partType, partId) => {
        console.log('price:',totalPrice)
        setCar(prevCar => {
            const updatedCar = { ...prevCar, [partType]: partId }
            console.log(updatedCar)
            calculateTotalPrice(updatedCar, exteriorOptions, roofOptions, wheelsOptions, interiorOptions)
            return updatedCar
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateCarById(id, { ...car, price: totalPrice })
            navigate('/customcars/' + id)
        } catch (error) {
            console.error('Error updating car:', error)
        }
    }

    if (!car) {
        return <p>Loading...</p>
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={car.name} onChange={(e) => setCar({ ...car, name: e.target.value })} />
                </label>
                <div className="image-selector">
                    <label>Exterior:</label>
                    {exteriorOptions.map(option => (
                        <label key={option.id}>
                            <input type="radio" name="exterior" checked={car.exterior === option.id} onChange={() => handlePartChange('exterior', option.id)} />
                            <img src={`http://localhost:3000/data/img/exterior/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="image-selector">
                    <label>Roof:</label>
                    {roofOptions.map(option => (
                        <label key={option.id}>
                            <input type="radio" name="roof" checked={car.roof === option.id} onChange={() => handlePartChange('roof', option.id)} />
                            <img src={`http://localhost:3000/data/img/roof/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="image-selector">
                    <label>Wheels:</label>
                    {wheelsOptions.map(option => (
                        <label key={option.id}>
                            <input type="radio" name="wheels" checked={car.wheels === option.id} onChange={() => handlePartChange('wheels', option.id)} />
                            <img src={`http://localhost:3000/data/img/wheels/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="image-selector">
                    <label>Interior:</label>
                    {interiorOptions.map(option => (
                        <label key={option.id}>
                            <input type="radio" name="interior" checked={car.interior === option.id} onChange={() => handlePartChange('interior', option.id)} />
                            <img src={`http://localhost:3000/data/img/interior/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="price-container">
                    <p>Total Price: ${totalPrice}</p>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditCar