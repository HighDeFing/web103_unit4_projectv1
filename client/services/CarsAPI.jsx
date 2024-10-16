const getAllCars = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/cars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
}

const getCarById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cars/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching car:', error);
        throw error;
    }
}

const getExterior = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/exterior');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching exterior:', error);
        throw error;
    }
}

const getRoof = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/roof');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching roof:', error);
        throw error;
    }
}

const getWheels = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/wheels');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching wheels:', error);
        throw error;
    }
}

const getInterior = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/interior');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching interior:', error);
        throw error;
    }
}

const deleteCarById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
}

const updateCarById = async (id, car) => {
    try {
        const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
}

const createCar = async (car) => {
    try {
        const response = await fetch('http://localhost:3000/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error creating car:', error);
        throw error;
    }
}


export  { getAllCars, getCarById, getRoof, getExterior, getWheels, getInterior, deleteCarById, updateCarById, createCar };