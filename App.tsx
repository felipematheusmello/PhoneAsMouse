import React, { useEffect } from 'react';

import { Body } from './src/styles';
import { ButtonContainer } from './src/styles/button';
import { ButtonComponent } from './src/components/Button';
import colors from './src/styles/colors';
import MovementLogger from './src/components/Sensor';

function App(): React.JSX.Element {

  const clickLeftButton = () => {
    console.log('clickedLeftButton');
  };

  const clickRightButton = () => {
    console.log('clickedRightButton');
  };

  useEffect(() => {
    console.log('entered');
  }, []);

  return (
    <Body>
      <MovementLogger />
      <ButtonContainer>
        <ButtonComponent label="Left Button" backgroundColor={colors.graylight} callback={clickLeftButton} />
        <ButtonComponent label="Right Button" backgroundColor={colors.gray} callback={clickRightButton} />
      </ButtonContainer>
    </Body>
  );
}

export default App;
