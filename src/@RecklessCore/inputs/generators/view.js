import { memo } from 'react'

import OrbitGenerator from './Orbit/index';
import SinewaveGenerator from './Sinewave/index';
import GeneratorManager, { DefaultProps } from '../../managers/GeneratorManager';

const GeneratorsView = ({props}) => {
      switch(props.type) {
        default:
        case 'Orbit':
          return <GeneratorManager {...DefaultProps} type={props.type} {...props}>
            <OrbitGenerator/>
          </GeneratorManager>;
        case 'Sinewave':
          return <GeneratorManager {...DefaultProps} type={props.type} {...props}>
            <SinewaveGenerator/>
          </GeneratorManager>;
      }
}

GeneratorsView.whyDidYouRender = true;

export default memo(GeneratorsView);