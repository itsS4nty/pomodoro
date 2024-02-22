import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SliderInput from '../components/general/SliderInput';
import CheckboxInput from '../components/general/CheckboxInput';
import { EventsOn } from '../config/events';
import { IIpc } from '../services/providers/ipc';
import MainContext from '../context/context';
import { Config } from '../types/config';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { hexToRGBA } from '../lib/styles-helper';

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.SettingsPage.background};
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    gap: 42px;

    h1 {
        margin-top: 5%;
    }

    div {
        .settings {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: 25px;
            width: 225px;
        }
    }
`;

const SaveButton = styled.button`
    all: unset;
    position: absolute;
    background-color: ${props => props.theme.SettingsPage.primary};
    color: ${props => props.theme.SettingsPage.fontColor};
    font-weight: 500;
    /* padding: 15px 20px; */
    width: 80px;
    height: 35px;
    text-align: center;
    border-radius: 15px;
    bottom: 10px;
    cursor: pointer;
`;

const CloseContainer = styled(Link)`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => hexToRGBA(props.theme.SettingsPage.secondary, 0.55)};
    border-radius: 50%;
    cursor: pointer;
`;

const SettingsPage = () => {
    const main = useContext(MainContext)!;
    const [workPhase, setWorkPhase] = useState(25);
    const [breakPhase, setBreakPhase] = useState(5);
    const [longBreakPhase, setLongBreakPhase] = useState(15);
    const [longBreakPhaseAfter, setLongBreakPhaseAfter] = useState(4);
    const [launchAtStartup, setLaunchAtStartup] = useState(false);
    const [sync, setSync] = useState(false);

    useEffect(() => {
        const listener = new (class implements IIpc {
            onEventReceived(event: EventsOn, data: Config): void {
                if(event !== 'get-config-response') return;
                setWorkPhase(data.workPhaseSeconds / 60);
                setBreakPhase(data.breakPhaseSeconds / 60);
                setLongBreakPhase(data.longBreakPhaseSeconds / 60);
                setLongBreakPhaseAfter(data.counterToLongPhase);
            }
        })();
        main.ipcService.subscribeToEvents(listener);
        main.ipcService.send('get-config');

        return () => main.ipcService.unsubscribeToEvents(listener);
    }, [main.ipcService]);

    useEffect(() => {
        const listener = new (class implements IIpc {
            onEventReceived(event: EventsOn, data: boolean): void {
                if(event !== 'update-config-response') return;
                if(data) alert('Config saved');
                else alert('Error while saving config');
            }
        })();
        main.ipcService.subscribeToEvents(listener);

        return () => main.ipcService.unsubscribeToEvents(listener);
    }, [main.ipcService]);

    const saveConfig = () => {
        const config: Config = {
            workPhaseSeconds: workPhase * 60,
            breakPhaseSeconds: breakPhase * 60,
            longBreakPhaseSeconds: longBreakPhase * 60,
            counterToLongPhase: longBreakPhaseAfter,
            launchAtStartup,
        };
        main.ipcService.send('update-config', config);
    };

    return (
        <Container>
            <CloseContainer to='/'>
                <Icon url='/icons/close.png' />
            </CloseContainer>
            <h1>Settings</h1>
            <div>
                <h3>Timer settings</h3>
                <div className='settings'>
                    <SliderInput
                        sliderValue={workPhase}
                        min={5}
                        max={60}
                        step={5}
                        setSliderValue={setWorkPhase}
                        title='Work Phase Duration'
                    />
                    <SliderInput
                        sliderValue={breakPhase}
                        min={5}
                        max={30}
                        step={5}
                        setSliderValue={setBreakPhase}
                        title='Break Phase Duration'
                    />
                    <SliderInput
                        sliderValue={longBreakPhase}
                        min={10}
                        max={45}
                        step={5}
                        setSliderValue={setLongBreakPhase}
                        title='Long Break Phase Duration'
                    />
                    <SliderInput
                        sliderValue={longBreakPhaseAfter}
                        min={1}
                        max={10}
                        step={1}
                        setSliderValue={setLongBreakPhaseAfter}
                        title='Long Break After'
                        valueText='int'
                    />
                </div>
            </div>
            <div>
                <h3>General</h3>
                <div className='settings general'>
                    <CheckboxInput
                        label='Launch at startup'
                        isChecked={launchAtStartup}
                        setIsChecked={setLaunchAtStartup}
                    />
                    <CheckboxInput label='Sync' isChecked={sync} setIsChecked={setSync} />
                </div>
            </div>
            <SaveButton onClick={saveConfig}>Save</SaveButton>
        </Container>
    );
};

export default SettingsPage;
