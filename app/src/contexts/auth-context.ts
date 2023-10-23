import {createContext} from '@lit/context';
import type { Session } from '../interfaces/session-interface';
export type { Session } from '../interfaces/session-interface';
export const sessionContext = createContext<Session>('session');
