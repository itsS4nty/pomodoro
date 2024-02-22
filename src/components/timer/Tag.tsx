import styled from 'styled-components';
import Icon from '../Icon';
import { ThemePhases } from '../../config/theme/theme-styles';

type TagProps = {
    phase: ThemePhases;
};

const TagStyled = styled.div<TagProps>`
    width: fit-content;
    padding: 0 10px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: ${props => props.theme[props.phase].primary};
    border: 2px solid;
    border-color: ${props => props.theme[props.phase].secondary};
    border-radius: 24px;

    span {
        font-size: 12px;
        line-height: 0;
        font-weight: 600;
        color: ${props => props.theme[props.phase].fontColor};
    }
    img {
        height: calc(100% - 7.5px);
        object-fit: cover;
    }
`;

const Tag = (props: TagProps) => {
    const getInfo = () => {
        if(props.phase === 'WorkPhase')
            return (
                <>
                    <Icon url='/icons/brain.png' />
                    <span>Focus</span>
                </>
            );
        return (
            <>
                <Icon url='/icons/relax.png' />
                <span>{props.phase === 'BreakPhase' ? 'Short Break' : 'Long Break'}</span>
            </>
        );
    };

    return <TagStyled phase={props.phase}>{getInfo()}</TagStyled>;
};

export default Tag;
