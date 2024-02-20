import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Options from '../components/timer/Options';
import Tag from '../components/timer/Tag';
import { ThemePhases } from '../config/theme/theme-styles';
import { Config } from '../types/config';
import Timer from '../components/timer/Timer';
import MainContext from '../context/context';
import { IIpc } from '../services/providers/ipc';
import { EventsOn } from '../config/events';
import { hexToRGBA } from '../lib/styles-helper';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';

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

const SettingsContainer = styled(Link)`
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

const TimerPage = () => {
    const main = useContext(MainContext)!;
    const [seconds, setSeconds] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const [urlPlayPauseImg, setUrlPlayPauseImg] = useState('/icons/play.png');
    const [counter, setCounter] = useState(0);
    const [config, setConfig] = useState<Config>({} as Config);

    useEffect(() => {
        const listener = new (class implements IIpc {
            onEventReceived(event: EventsOn, data: Config): void {
                if (event !== 'get-config-response') return;
                setConfig(data);
                if (phase === 'WorkPhase') setSeconds(data.workPhaseSeconds);
                else if (phase === 'BreakPhase') setSeconds(data.longBreakPhaseSeconds);
                else setSeconds(data.longBreakPhaseSeconds);
            }
        })();
        main.ipcService.subscribeToEvents(listener);
        main.ipcService.send('get-config');

        return () => main.ipcService.unsubscribeToEvents(listener);
    }, [main.ipcService]);

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

    const reset = (playAudio: boolean = true) => {
        if(playAudio) {
            const audio = new Audio('/audio/done.mp3');
            audio.play();
        }
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

    return (
        <Container>
            <SettingsContainer to='/settings'>
                <Icon url='/icons/settings.png' />
            </SettingsContainer>
            <Tag phase={phase} />
            <Timer phase={phase} minutes={minutes} seconds={displaySeconds} />
            <Options phase={phase} onToggleTimer={toggleTimer} urlPlayPauseImg={urlPlayPauseImg} onSkipTimer={reset} />
        </Container>
    );
};

export default TimerPage;
