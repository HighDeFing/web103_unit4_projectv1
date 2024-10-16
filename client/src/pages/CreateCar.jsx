import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { createCar, getExterior, getRoof, getWheels, getInterior } from '../../services/CarsAPI.jsx'
import '../css/CreateCar.css'

const CreateCar = () => {
    const [name, setName] = useState('')
    const [exterior, setExterior] = useState('')
    const [roof, setRoof] = useState('')
    const [wheels, setWheels] = useState('')
    const [interior, setInterior] = useState('')
    const [exteriorOptions, setExteriorOptions] = useState([])
    const [roofOptions, setRoofOptions] = useState([])
    const [wheelsOptions, setWheelsOptions] = useState([])
    const [interiorOptions, setInteriorOptions] = useState([])
    const [error, setError] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exteriorData = await getExterior()
                const roofData = await getRoof()
                const wheelsData = await getWheels()
                const interiorData = await getInterior()

                setExteriorOptions(exteriorData)
                setRoofOptions(roofData)
                setWheelsOptions(wheelsData)
                setInteriorOptions(interiorData)
            } catch (error) {
                console.error('Error fetching options:', error)
            }
        }

        fetchData()
    }, [])

    const calculateTotalPrice = async (exteriorId, roofId, wheelsId, interiorId) => {
        try {
            const exteriorPrice = exteriorId ? (await getExterior()).find(item => item.id === parseInt(exteriorId)).price : 0
            const roofPrice = roofId ? (await getRoof()).find(item => item.id === parseInt(roofId)).price : 0
            const wheelsPrice = wheelsId ? (await getWheels()).find(item => item.id === parseInt(wheelsId)).price : 0
            const interiorPrice = interiorId ? (await getInterior()).find(item => item.id === parseInt(interiorId)).price : 0
            setTotalPrice(exteriorPrice + roofPrice + wheelsPrice + interiorPrice)
        } catch (error) {
            console.error('Error calculating total price:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !exterior || !roof || !wheels || !interior) {
            setError('All fields must be selected')
            return
        }
        const newCar = {
            name,
            exterior: parseInt(exterior, 10),
            roof: parseInt(roof, 10),
            wheels: parseInt(wheels, 10),
            interior: parseInt(interior, 10)
        }
        try {
            await createCar(newCar)
            navigate('/customcars')
        } catch (error) {
            console.error('Error creating car:', error)
        }
    }

    useEffect(() => {
        calculateTotalPrice(exterior, roof, wheels, interior)
    }, [exterior, roof, wheels, interior])

    return (
        <div className="container">
            <h2>Create a New Car</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <div className="image-selector">
                    <p>Exterior:</p>
                    {exteriorOptions.map(option => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                name="exterior"
                                value={option.id}
                                checked={String(exterior) === String(option.id)}
                                onChange={(e) => setExterior(e.target.value)}
                            />
                            <img src={`http://localhost:3000/data/img/exterior/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="image-selector">
                    <p>Roof:</p>
                    {roofOptions.map(option => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                name="roof"
                                value={option.id}
                                checked={String(roof) === String(option.id)}
                                onChange={(e) => setRoof(e.target.value)}
                            />
                            <img src={`http://localhost:3000/data/img/roof/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="image-selector">
                    <p>Wheels:</p>
                    {wheelsOptions.map(option => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                name="wheels"
                                value={option.id}
                                checked={String(wheels) === String(option.id)}
                                onChange={(e) => setWheels(e.target.value)}
                            />
                            <img src={`http://localhost:3000/data/img/wheels/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="image-selector">
                    <p>Interior:</p>
                    {interiorOptions.map(option => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                name="interior"
                                value={option.id}
                                checked={String(interior) === String(option.id)}
                                onChange={(e) => setInterior(e.target.value)}
                            />
                            <img src={`http://localhost:3000/data/img/interior/${option.image}`} alt={option.name} />
                        </label>
                    ))}
                </div>
                <div className="price-container">
                    <p>Total Price: ${totalPrice}</p>
                </div>
                <button type="submit">Create Car</button>
            </form>
        </div>
    )
}

export default CreateCar