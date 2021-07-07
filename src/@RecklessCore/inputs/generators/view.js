import { memo } from 'react'

import OrbitGenerator from './Orbit/index';
import SinewaveGenerator from './Sinewave/index';
import GeneratorManager, { DefaultProps } from '../../managers/GeneratorManager';

const GeneratorsView = ({props, connection}) => {
      switch(props.type) {
        default:
        case 'Orbit':
          return <GeneratorManager {...DefaultProps} type={props.type} {...props}>
            <OrbitGenerator {...{ toProp: connection.toProp }}/>
          </GeneratorManager>;
        case 'Sinewave':
          return <GeneratorManager {...DefaultProps} type={props.type} {...props}>
            <SinewaveGenerator {...{ toProp: connection.toProp }}/>
          </GeneratorManager>;
      }
}

GeneratorsView.whyDidYouRender = true;

export default memo(GeneratorsView);