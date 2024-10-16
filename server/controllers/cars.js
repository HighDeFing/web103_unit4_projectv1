import { pool } from '../config/database.js'

const getCars = async (req, res) => { // get all cars
    try {
        const response = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarById = async (req, res) => { // get car by id
    try {
        const id = parseInt(req.params.carId)
        const response = await pool.query(`SELECT * FROM cars WHERE id = $1`, [id])
        res.status(200).json(response.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createCar = async (req, res) => { // create car
    try {
        const { name, exterior, roof, wheels, interior } = req.body

        // Fetch prices of the selected parts
        const exteriorPrice = await pool.query('SELECT price FROM exterior WHERE id = $1', [exterior])
        const roofPrice = await pool.query('SELECT price FROM roof WHERE id = $1', [roof])
        const wheelsPrice = await pool.query('SELECT price FROM wheels WHERE id = $1', [wheels])
        const interiorPrice = await pool.query('SELECT price FROM interior WHERE id = $1', [interior])

        // Calculate total price
        const totalPrice = exteriorPrice.rows[0].price + roofPrice.rows[0].price + wheelsPrice.rows[0].price + interiorPrice.rows[0].price

        // Insert new car with total price
        const response = await pool.query(
            `INSERT INTO cars (name, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, exterior, roof, wheels, interior, totalPrice]
        )
        res.status(201).json(response.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateCar = async (req, res) => { // update car
    try {
        const id = parseInt(req.params.carId)
        const { name, exterior, roof, wheels, interior } = req.body

        // Fetch prices of the selected parts
        const exteriorPrice = await pool.query('SELECT price FROM exterior WHERE id = $1', [exterior])
        const roofPrice = await pool.query('SELECT price FROM roof WHERE id = $1', [roof])
        const wheelsPrice = await pool.query('SELECT price FROM wheels WHERE id = $1', [wheels])
        const interiorPrice = await pool.query('SELECT price FROM interior WHERE id = $1', [interior])

        // Calculate total price
        const totalPrice = exteriorPrice.rows[0].price + roofPrice.rows[0].price + wheelsPrice.rows[0].price + interiorPrice.rows[0].price

        // Update car with total price
        const response = await pool.query(
            `UPDATE cars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, price = $6 WHERE id = $7 RETURNING *`,
            [name, exterior, roof, wheels, interior, totalPrice, id]
        )
        res.status(200).json(response.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => { // delete car
    try {
        const id = parseInt(req.params.carId)
        await pool.query(`DELETE FROM cars WHERE id = $1`, [id])
        res.status(200).json({ message: `Car with ID ${id} was deleted` })
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarExterior = async (req, res) => { // get car exterior
    try {
        console.log('Fetching car exteriors...')
        const response = await pool.query('SELECT * FROM exterior ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarRoof = async (req, res) => { // get car roof
    try {
        const response = await pool.query('SELECT * FROM roof ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarsWheels = async (req, res) => { // get car wheels
    try {
        const response = await pool.query('SELECT * FROM wheels ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getCarInterior = async (req, res) => { // get car interior
    try {
        const response = await pool.query('SELECT * FROM interior ORDER BY id ASC')
        res.status(200).json(response.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default { getCars, getCarById, createCar, updateCar, deleteCar, getCarExterior, getCarRoof, getCarsWheels, getCarInterior }