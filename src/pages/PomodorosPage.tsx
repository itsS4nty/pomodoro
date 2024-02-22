import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../components/Icon';
import { hexToRGBA } from '../lib/styles-helper';

const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.WorkPhase.background};
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
`;

const CloseContainer = styled(Link)`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => hexToRGBA(props.theme.WorkPhase.secondary, 0.55)};
    border-radius: 50%;
    cursor: pointer;
`;

const PomodorosPage = () => {
    return (
        <Container>
            <CloseContainer to='/'>
                <Icon url='/icons/close.png' />
            </CloseContainer>
            WorksPage
        </Container>
    );
};

export default PomodorosPage;
