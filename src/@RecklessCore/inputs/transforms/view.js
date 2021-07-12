import { memo } from 'react'

import TransformManager, { DefaultProps } from '../../managers/TransformManager';

import MultiplyTransform from './Multiply/index';

const TransformsView = ({props}) => {
  switch(props.type) {
    default:
    case 'Orbit':
      return <TransformManager {...DefaultProps} type={props.type} {...props}>
        <MultiplyTransform {...props}/>
      </TransformManager>;
  }
}

TransformsView.whyDidYouRender = true;

export default memo(TransformsView);