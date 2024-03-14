import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/usuariosServices";

interface User {
    id?:number
    rol?: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    email: string;
    contrasenya: string;
    calle?: string;
    numero?: string;
    ciudad?: string;
    codigo_postal?: string;
    provincia?: string;
}

export const fetchAllUsuarios = async () => {
    try {
      const users = await getAllUsers();
      //console.log('Todos los usuarios:', users);
      return users
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
    }
};

export const fetchUserById = async (id: number) => {
    try {
      const user = await getUserById(id);
      return user
      //console.log('Usuario by Id:', user);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
};

export const fetchCreateUsuario = async (usuario: User) => {
    try {
      const user = await createUser(usuario);
      //console.log('Usuario creado correctamente:', user);
    } catch (error) {
      console.error('Error al crear pedido:', error);
    }
};

export const fetchUpdateUsuario = async (id: number, data: User) => {
    try {
      const user = await updateUser(id, data);
      //console.log('Usuario actualizado correctamente:', user);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
};

export const fetchDeleteUsuario = async (id: number) => {
    try {
      const user = await deleteUser(id);
      //console.log('Usuario eliminado correctamente:', user);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
};