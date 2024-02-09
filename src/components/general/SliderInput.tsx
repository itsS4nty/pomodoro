import styled from 'styled-components';

type SliderInputProps = {
    sliderValue: number;
    min: number;
    max: number;
    step: number;
    setSliderValue: (v: number) => void;
    title: string;
    valueText: string;
};

const SliderContainer = styled.div`
    display: flex; // Use flexbox to align items on the same line
    flex-direction: column;
    gap: 5px;
`;


const SliderLabel = styled.span`
    color: ${props => props.theme.SettingsPage.fontColor}; // Dark grey font color
    font-weight: 500;
`;

const RangeContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
`;

const SliderValue = styled.span`
    color: ${props => props.theme.SettingsPage.fontColor}; // Dark grey font color
`;

const RangeInput = styled.input`
    -webkit-appearance: none; // Override default appearance
    flex-grow: 1; // Allow the slider to grow to fill available space
    height: 8px; // Height of the slider
    border-radius: 5px;
    background: ${props =>
        props.theme.SettingsPage.secondary}; // Softer blue for the slider background
    outline: none;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: ${props => props.theme.SettingsPage.primary}; // Light pastel blue for hover
    }

    // Slider Thumb
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px; // Width of the thumb
        height: 10px; // Height of the thumb
        border-radius: 50%;
        background: ${props =>
            props.theme.SettingsPage.fontColor}; // Dark grey for the slider thumb
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${props => props.theme.SettingsPage.fontColor};
        cursor: pointer;
    }
`;

const SliderInput = (props: SliderInputProps) => {
    return (
        <SliderContainer>
            <SliderLabel>{props.title}</SliderLabel>
            <RangeContainer>
                <RangeInput
                    type='range'
                    min={props.min}
                    max={props.max}
                    value={props.sliderValue}
                    step={props.step}
                    onChange={e => props.setSliderValue(parseInt(e.target.value, 10))}
                />{' '}
                <SliderValue>{String(props.sliderValue).padStart(2, '0')} {props.valueText}</SliderValue>
            </RangeContainer>
        </SliderContainer>
    );
};

SliderInput.defaultProps = {
    valueText: 'min',
};

export default SliderInput;
