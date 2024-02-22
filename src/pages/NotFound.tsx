import styled from 'styled-components';

const Container = styled.section`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.background.bg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4em;
`;

const Title = styled.span`
    color: ${props => props.theme.colors.secondary500};
    font-size: ${props => props.theme.fontSizes.xxl};
`;

const Description = styled.span`
    color: ${props => props.theme.colors.secondary500};
    font-size: ${props => props.theme.fontSizes.s};
`;

const Error = styled.span`
    color: ${props => props.theme.colors.secondary500};
    font-size: ${props => props.theme.fontSizes.xs};
    font-style: italic;
`;

const NotFound = () => {
    return (
        <Container>
            <Title>Ooops!</Title>
            <Description>Sorry, page not found.</Description>
            <Error>Error 404</Error>
        </Container>
    );
};

export default NotFound;
