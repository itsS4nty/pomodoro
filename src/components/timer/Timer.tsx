import styled from 'styled-components';
import { ThemePhases } from '../../config/theme/theme-styles';

type TimerProps = {
    phase: ThemePhases;
    minutes: number;
    seconds: number;
};

const TimerStyled = styled.div<{ phase: ThemePhases }>`
    display: flex;
    flex-direction: column;

    span {
        font-size: 200px;
        line-height: 80%;
        color: ${props => props.theme[props.phase].fontColor};
        font-weight: 700;
        text-shadow: 2.5px 2px 7px rgba(0, 0, 0, 0.5);
        font-family: 'Azeret Mono', monospace;
    }
    span.seconds {
        color: ${props => props.theme[props.phase].fontColor};
        opacity: 0.85;
    }
`;

const Timer = (props: TimerProps) => {
    return (
        <TimerStyled phase={props.phase}>
            <span className='minutes'>{String(props.minutes).padStart(2, '0')}</span>
            <span className='seconds'>{String(props.seconds).padStart(2, '0')}</span>
        </TimerStyled>
    );
};

export default Timer;
