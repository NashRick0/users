import express from 'express';
import { createUser, getUsers, updateUser, deleteUser, login } from '../controllers/userController.js';


const router = express.Router();

//router.post('/', createUser);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.post('/login', login);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users from the database
 *     tags: 
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 * 
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - phone
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 10
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente 
 * 
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario específico.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 8
 *               phone:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 10
 *     responses:
 *       200:
 *         description: User updated successfully
 * 
 *   delete:
 *     summary: Eliminar un usuario (deshabilitar)
 *     description: Marca el estado del usuario como inactivo en lugar de eliminarlo permanentemente.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 * 
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Inicia sesión con las credenciales del usuario.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 *  
 */



router.get('/all', getUsers);

router.patch('/:id', updateUser);

router.post('/login', login); 

export default router;
