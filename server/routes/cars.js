import express from 'express';
import CarsController from '../controllers/cars.js'



const router = express.Router();




router.get('/cars', CarsController.getCars);
router.post('/cars', CarsController.createCar);
router.patch('/cars/:carId', CarsController.updateCar)
router.delete('/cars/:carId', CarsController.deleteCar)

router.get('/cars/:carId', CarsController.getCarById)

router.get('/exterior', CarsController.getCarExterior)
router.get('/roof', CarsController.getCarRoof)
router.get('/wheels', CarsController.getCarsWheels)
router.get('/interior', CarsController.getCarInterior)

export default router

