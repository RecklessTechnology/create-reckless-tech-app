import useConnectionsContext from '../../contexts/useConnectionsContext';

import PingEveryoneButtonview from './view';

const PingEveryoneButton = () => {
  const { me } = useConnectionsContext();

  return <PingEveryoneButtonview {...{ me }} />;
};

PingEveryoneButton.whyDidYouRender = true;

export default PingEveryoneButton;
