import { useState } from 'react';
import styled from 'styled-components';
import SliderInput from '../components/general/SliderInput';

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.SettingsPage.background};
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    gap: 42px;
    /* padding: 0 15px; */
    padding-top: 15%;

    div {
        .timer-settings {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
    }
`;

const SettingsPage = () => {
    const [workPhase, setWorkPhase] = useState(25);
    const [breakPhase, setBreakPhase] = useState(25);
    const [longBreakPhase, setLongBreakPhase] = useState(25);
    const [longBreakPhaseAfter, setLongBreakPhaseAfter] = useState(4);

    return (
        <Container>
            <h1>Settings</h1>
            <div>
                <h3>Timer settings</h3>
                <div className='timer-settings'>
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
                <h3>Daily goals</h3>
                <div className='daily-settings'>

                </div>
            </div>
        </Container>
    );
};

export default SettingsPage;
