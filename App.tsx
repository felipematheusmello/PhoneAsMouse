import React, { useEffect, useState } from 'react';

import { Body } from './src/styles';
import { ButtonContainer } from './src/styles/button';
import { ButtonComponent } from './src/components/Button';
import colors from './src/styles/colors';
import MovementLogger from './src/components/Sensor';

function App(): React.JSX.Element {
  const [clickStatus, setClickStatus] = useState<null | 'left' | 'right'>(null);

  const clickLeftButton = () => {
    setClickStatus('left');
    console.log('clickedLeftButton');
  };

  const clickRightButton = () => {
    setClickStatus('right');
    console.log('clickedRightButton');
  };

  const handleClick = (argument: null | 'left' | 'right') => {
    setClickStatus(argument);
  }

  useEffect(() => {
    console.log('entered');
  }, []);

  return (
    <Body>
      <MovementLogger clickStatus={clickStatus} setClickStatus={handleClick} />
      <ButtonContainer>
        <ButtonComponent label="Left Button" backgroundColor={colors.graylight} callback={clickLeftButton} />
        <ButtonComponent label="Right Button" backgroundColor={colors.gray} callback={clickRightButton} />
      </ButtonContainer>
    </Body>
  );
}

export default App;
