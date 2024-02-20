import { useState } from 'react';
import styled from 'styled-components';

type CheckboxInputProps = {
    isChecked: boolean;
    setIsChecked: (v: boolean) => void;
    label: string;
};

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #4a4a4a;
    width: 100%;
    justify-content: space-between;
`;

const CheckInput = styled.input`
    appearance: none;
    -webkit-appearance: none;
    margin-right: 10px;
    font-size: 16px;
    width: 20px;
    height: 20px;
    border: 2px solid #c6c6c6; // Medium-light grey for border
    border-radius: 4px;
    display: inline-block;
    position: relative;
    cursor: pointer;

    &:checked {
        background-color: #c6c6c6; // Medium-light grey for checked state
        border-color: #c6c6c6; // Keep border color consistent

        &:after {
            content: '';
            position: absolute;
            left: 5px;
            top: 1px;
            width: 6px;
            height: 12px;
            border: solid #4a4a4a; // Darker grey for checkmark
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }
`;

const CheckboxLabel = styled.span`
    user-select: none;
`;

function CheckboxInput(props: CheckboxInputProps) {

    const toggleCheckbox = () => {
        props.setIsChecked(!props.isChecked);
    };

    return (
        <CheckboxContainer onClick={toggleCheckbox}>
            <CheckboxLabel>{props.label}</CheckboxLabel>
            <CheckInput type='checkbox' checked={props.isChecked} onChange={toggleCheckbox} />
        </CheckboxContainer>
    );
}

export default CheckboxInput;
