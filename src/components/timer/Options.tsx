import styled from 'styled-components';
import { hexToRGBA } from '../../lib/styles-helper';
import Icon from '../Icon';
import { ThemePhases } from '../../config/theme/theme-styles';
import { Link } from 'react-router-dom';

type OptionsProps = {
    phase: ThemePhases;
    onToggleTimer: () => void;
    urlPlayPauseImg: string;
    onSkipTimer: (playAudio: boolean) => void;
};

const OptionsStyled = styled.div<{ phase: ThemePhases }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;

    div, a {
        all: unset;
        cursor: pointer;
        background-color: ${props => hexToRGBA(props.theme[props.phase].secondary, 0.3)};
        height: 50px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;

        &:nth-child(even) {
            background-color: ${props => hexToRGBA(props.theme[props.phase].secondary, 0.8)};
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

const Options = (props: OptionsProps) => {
    return (
        <OptionsStyled phase={props.phase}>
            <Link to='/pomodoros'>
                <Icon url='/icons/menu.png' />
            </Link>
            <div onClick={props.onToggleTimer}>
                <Icon url={props.urlPlayPauseImg} />
            </div>
            <div onClick={() => props.onSkipTimer(false)}>
                <Icon url='/icons/skip.png' />
            </div>
        </OptionsStyled>
    );
};

export default Options;
