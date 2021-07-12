import { memo } from 'react'

import GeneratorsView from './view';

const Generators = ({generators}) => {
  return generators.map((gen)=>{
    return (<GeneratorsView key={`rt_${gen.type}_generator_${gen.uuid}`} {...{props: gen }}/>);
  })
  
}

Generators.whyDidYouRender = false;

export default memo(Generators);