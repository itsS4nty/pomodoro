import './assets/styles/reset.css';
import ThemeContextProvider from './config/theme/Theme';
import MainContext from './context/context';
import Router from './router/Router';
import { MainService } from './services/main';

function App() {
    const mainController = new MainService();

    return (
        <MainContext.Provider value={mainController}>
            <ThemeContextProvider>
                <Router />
            </ThemeContextProvider>
        </MainContext.Provider>
    );
}

export default App;
