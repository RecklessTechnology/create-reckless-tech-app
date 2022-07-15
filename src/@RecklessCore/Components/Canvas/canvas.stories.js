import React, { useRef } from 'react';

import 'typeface-roboto-material';

import CanvasView from './view';

export default {
  title: 'Design System/Canvas/Default',
  component: CanvasView,
};

const DefaultTemplate = (props) => {
  const canvasRef = useRef();
  return (
    <CanvasView {...props} ref={canvasRef} />
  );
};

DefaultTemplate.propTypes = CanvasView.propTypes;

export const Default = DefaultTemplate.bind({});

Default.args = {
  width: 500,
  height: 500,
  backgroundColor: 'rgba(0,0,0,0.5)',
  className: '',
};

Default.parameters = {
  componentSubtitle: 'Basic HTML Canvas',
  jest: ['canvas.test.js'],
};
