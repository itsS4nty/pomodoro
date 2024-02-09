import { createContext } from 'react';
import { MainService } from '../services/main';

const MainContext = createContext<MainService | null>(null);
export default MainContext;
