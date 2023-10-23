import { createContext } from '@lit/context';
import { AuthContextValue } from '../interfaces/auth-interface';
export const authContext = createContext<AuthContextValue>(Symbol('auth-context'));

 