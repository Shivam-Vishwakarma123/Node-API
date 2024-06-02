const express = require('express')
const router = express.Router()
const employeeController =   require('../controllers/employee.controller');
const { authenticateToken } = require('../middleware/auth');

// Retrieve all employees
router.get('/', authenticateToken, employeeController.findAll);

// Retrieve a single employee with id
router.get('/:id', authenticateToken, employeeController.findById);

// Create a new employee
router.post('/', authenticateToken, employeeController.create);

// Update a employee with id
router.put('/:id', authenticateToken, employeeController.update);

// Delete a employee with id
router.delete('/:id', authenticateToken, employeeController.delete);

module.exports = router