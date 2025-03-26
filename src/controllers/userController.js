import User from '../models/userModel.js';
import { sendUserCreatedEvent } from '../services/rabbitServicesEvent.js';
import jwt from 'jsonwebtoken';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error en la lista de usuarios', error);
        res.status(500).json({ message: 'Error en el servidor'});
    }
};

export const createUser = async (req, res) => {
    const { password, username, phone } = req.body;

    //Validar datos requeridos (phone y username)
    if (!phone || !username) {
        return res.status(400).json({ message: 'Phone y username son requeridos' });
    }

    //Validar si ya existe el usuario
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    //Validar formato de correo (username)
    const formatEmail = /\S+@\S+\.\S+/;
    if (!formatEmail.test(username)) {
        return res.status(400).json({ message: 'Formato de correo incorrecto' });
    }

    //Validar tamaño del telefono
    if (phone.length !== 10) {
        return res.status(400).json({ message: 'El telefono debe tener 10 digitos' });
    }

    //Tamaño minimo de contraseña (8 caracteres)
    if (password.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }
    
    try {
        const newUser = await User.create({
            username,
            phone,
            password,
            status: true,
            creationDate: new Date(),
        });

        console.log(newUser);
        await sendUserCreatedEvent(newUser);

        return res.status(201).json({ message: 'User created', data: newUser });

    } catch (error) {
        console.error('Error al crear al usuario', error);
        console.error(error);
        return res.status(500).json({ message: 'Error al crear al usuario' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, phone } = req.body;

    //Validar que el telefono no este registrado
    const existingPhone = await User.findOne({ where: { phone } });
    if (existingPhone) {
        return res.status(400).json({ message: 'El telefono ya esta registrado' });
    }

    //Tamaño del telefono
    if (phone.length !== 10) {
        return res.status(400).json({ message: 'El telefono debe tener 10 digitos' });
    }

    //Tamaño minimo de contraseña
    if (password.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.update({
            password:password || user.password,
            phone:phone || user.phone,
        });

        return res.status(200).json({ message: 'Usuario actualizado', data: user });
    }
    catch (error) {
        console.error('Error al actualizar al usuario', error);
        return res.status(500).json({ message: 'Error al actualizar al usuario' });
    }

};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.update({
            status: false,
        });
        return res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error al eliminar al usuario', error);
        return res.status(500).json({ message: 'Error al eliminar al usuario' });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    //Validar datos requeridos
    if (!username || !password) {
        return res.status(400).json({ message: 'Username y password son requeridos' });
    }

    //Validar si existe el usuario
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    //Validar formato de correo (username)
    const formatEmail = /\S+@\S+\.\S+/;
    if (!formatEmail.test(username)) {
        return res.status(400).json({ message: 'Formato de correo incorrecto' });
    }

    //Validar contraseña
    if (user.password !== password) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    try{
        const SECRET_KEY = 'aJksd9QzPl+sVdK7vYc/L4dK8HgQmPpQ5K9yApUsj3w';

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
            expiresIn: '1h', subject: user.username });

        return res.status(200).json({ message: 'Login exitoso', data: token });

    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).json({ message: 'Error' });
    }

};