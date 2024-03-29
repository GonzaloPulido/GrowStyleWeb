import { create } from 'zustand'
import Cookies from 'js-cookie';

interface User {
    id?: number;
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

interface AuthState {
  loggedUser: User | any | null;
  isLogged: boolean;
  login: (user: User) => void;
  logout: () => void;
  update: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => {
  const loggedUserFromCookie = Cookies.get('loggedUser');
  const isLogged = !!loggedUserFromCookie;

  return {
    loggedUser: loggedUserFromCookie ? JSON.parse(loggedUserFromCookie) : null,
    isLogged,

    login: (user: User) => {
      set({ loggedUser: user, isLogged: true });
      Cookies.set('loggedUser', JSON.stringify(user), { expires: 7 });
    },

    logout: () => {
      set({ loggedUser: null, isLogged: false });
      Cookies.remove('loggedUser');
    },
    update: (user: User) => {
      set((state) => {
          const updatedUser = { ...state.loggedUser, ...user };
          Cookies.set('loggedUser', JSON.stringify(updatedUser), { expires: 7 });
          return { loggedUser: updatedUser, isLogged: true };
      });
    },
  };
});

export default useAuthStore;