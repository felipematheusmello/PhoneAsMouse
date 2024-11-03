import React from 'react';
import { Button, ButtonLabel } from '../../styles/button';

interface IButtonArguments {
    backgroundColor?: string;
    callback?: (value?: unknown) => void;
    label?: string;
}

export const ButtonComponent = ({ backgroundColor, callback = () => { }, label }: IButtonArguments) => {
    return (
        <Button onPress={callback} backgroundColor={backgroundColor}>
            {label ? <ButtonLabel>
                {label}
            </ButtonLabel> : null}
        </Button>
    );
};
