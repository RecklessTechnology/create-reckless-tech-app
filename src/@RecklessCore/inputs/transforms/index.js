import { memo } from 'react'

import TransformsView from './view';

const Transforms = ({transforms}) => {
  return transforms.map((transform)=>{
    return (<TransformsView key={`rt_${transform.type}_transform_${transform.uuid}`} {...{props: transform}}/>);
  })
  
}

Transforms.whyDidYouRender = false;

export default memo(Transforms);