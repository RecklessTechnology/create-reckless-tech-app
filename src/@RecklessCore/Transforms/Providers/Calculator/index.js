import { useCallback, useEffect } from 'react';

import useAppContext from '../../../App/Contexts/useAppContext';
import useTransformContext from '../../Contexts/useTransformContext';

const CalculatorTransform = ({ connections }) => {
  const {
    uuid, setValue: setTransValue, amount, operator,
  } = useTransformContext();
  const { subscribe, unsubscribe } = useAppContext();

  const calculate = useCallback((v) => {
    switch (operator.toLowerCase()) {
      default:
        // eslint-disable-next-line no-console
        console.log(`Unknown Operator Used: ${operator}`);
        return v;
      case 'add':
        return (v + amount);
      case 'subtract':
        return (v - amount);
      case 'multiply':
        return (v * amount);
      case 'divide':
        return (v / amount);
    }
  }, [amount, operator]);

  // Inputs
  useEffect(() => {
    const updateFromInput = (prop, val) => {
      switch (prop.toLowerCase()) {
        default:
          // eslint-disable-next-line no-console
          console.log(`Unknown Prop Sent to Calculator: ${prop}`);
          break;
        case 'value':
          setTransValue(val.map(calculate));
          break;
      }
    };

    connections.filter((c) => (c.to === uuid)).forEach((c) => {
      subscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
    });

    return () => {
      connections.filter((c) => (c.to === uuid)).forEach((c) => {
        unsubscribe(`${c.from}-${c.fromProp.toLowerCase()}-updated`, (val) => { updateFromInput(c.toProp.toLowerCase(), val); });
      });
    };
  }, [connections, uuid, subscribe, unsubscribe, amount, setTransValue, calculate]);

  return null;
};

CalculatorTransform.whyDidYouRender = (process.env.NODE_ENV === 'development');

export default CalculatorTransform;
