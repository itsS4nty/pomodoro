import styled from 'styled-components';
import './assets/styles/reset.css';
import ThemeContextProvider from './config/theme/Theme';
import { ThemePhases } from './config/theme/theme-styles';
import Icon from './components/Icon';
import { hexToRGBA } from './lib/styles-helper';
import { useEffect, useState } from 'react';
import { Config } from './types/config';

let phase: ThemePhases = 'WorkPhase';

const Container = styled.div`
    background-color: ${props => props.theme[phase].background};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 42px;

    div.timer {
        display: flex;
        flex-direction: column;

        span {
            font-size: 200px;
            line-height: 80%;
            color: ${props => props.theme[phase].fontColor};
            font-weight: 700;
            text-shadow: 2.5px 2px 7px rgba(0, 0, 0, 0.5);
            font-family: 'Azeret Mono', monospace;
        }
        span.seconds {
            color: ${props => props.theme[phase].fontColor};
            opacity: 0.85;
        }
    }
`;

const Tag = styled.div`
    width: fit-content;
    padding: 0 10px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: ${props => props.theme[phase].primary};
    border: 2px solid;
    border-color: ${props => props.theme[phase].secondary};
    border-radius: 24px;

    span {
        font-size: 12px;
        line-height: 0;
        font-weight: 600;
        color: ${props => props.theme[phase].fontColor};
    }
    img {
        height: calc(100% - 7.5px);
        object-fit: cover;
    }
`;

const Options = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;

    div {
        cursor: pointer;
        background-color: ${props => hexToRGBA(props.theme[phase].secondary, 0.3)};
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;

        &:nth-child(even) {
            background-color: ${props => hexToRGBA(props.theme[phase].secondary, 0.8)};
            height: 60px;
            width: 75px;
        }

        img {
            height: 26px;
            width: 26px;
            object-fit: cover;
        }
    }
`;

const SettingsContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => hexToRGBA(props.theme[phase].secondary, 0.55)};
    border-radius: 50%;
    cursor: pointer;

    img {
        height: 32px;
        width: 32px;
        object-fit: cover;
    }
`;

function App() {
    const [seconds, setSeconds] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const [urlPlayPauseImg, setUrlPlayPauseImg] = useState('/icons/play.png');
    const [counter, setCounter] = useState(0);
    const [config, setConfig] = useState<Config>({} as Config);

    useEffect(() => {
        window.ipcRenderer.send('get-config');
        window.ipcRenderer.on('get-config-response', (_, data: Config) => {
            setConfig(data);
            if (phase === 'WorkPhase') setSeconds(data.workPhaseSeconds);
            else if (phase === 'BreakPhase') setSeconds(data.longBreakPhaseSeconds);
            else setSeconds(data.longBreakPhaseSeconds);
        });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 60);
            }, 1000);
        } else if (seconds === 0) {
            reset();
        }

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, seconds]);

    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    const toggleTimer = () => {
        setUrlPlayPauseImg(isActive ? '/icons/play.png' : '/icons/pause.png');
        setIsActive(!isActive);
    };

    const reset = () => {
        const audio = new Audio('/audio/done.mp3');
        audio.play();
        if (phase === 'WorkPhase') {
            const shortBreak = counter < config.counterToLongPhase;
            phase = shortBreak ? 'BreakPhase' : 'LongBreakPhase';
            setSeconds(shortBreak ? config.breakPhaseSeconds : config.longBreakPhaseSeconds);
            setCounter(shortBreak ? _counter => _counter + 1 : 0);
        } else {
            setSeconds(config.workPhaseSeconds);
            phase = 'WorkPhase';
        }
        setIsActive(false);
        setUrlPlayPauseImg('/icons/play.png');
    };

    const getInfo = () => {
        if (phase === 'WorkPhase')
            return (
                <>
                    <Icon url='/icons/brain.png' />
                    <span>Focus</span>
                </>
            );
        return (
            <>
                <Icon url='/icons/relax.png' />
                <span>{phase === 'BreakPhase' ? 'Short Break' : 'Long Break'}</span>
            </>
        );
    };

    return (
        <ThemeContextProvider>
            <Container>
                <SettingsContainer>
                    <Icon url='/icons/settings.png' />
                </SettingsContainer>
                <Tag>{getInfo()}</Tag>
                <div className='timer'>
                    <span className='minutes'>{String(minutes).padStart(2, '0')}</span>
                    <span className='seconds'>{String(displaySeconds).padStart(2, '0')}</span>
                </div>
                <Options>
                    <div>
                        <Icon url='/icons/menu.png' />
                    </div>
                    <div onClick={toggleTimer}>
                        <Icon url={urlPlayPauseImg} />
                    </div>
                    <div>
                        <Icon url='/icons/skip.png' />
                    </div>
                </Options>
            </Container>
        </ThemeContextProvider>
    );
}

export default App;
