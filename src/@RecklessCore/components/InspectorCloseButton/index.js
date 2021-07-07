import InspectorCloseButtonView from './view';

import useInspectorMenuContext from '../../contexts/useInspectorMenuContext';

const InspectorCloseButton = ({ name }) => {
  const { inspectorMenuOpen, setInspectorMenuOpen } = useInspectorMenuContext();

  return <InspectorCloseButtonView {...{ inspectorMenuOpen: inspectorMenuOpen, setInspectorMenuOpen: setInspectorMenuOpen }}/>;
}

InspectorCloseButton.whyDidYouRender = true;

export default InspectorCloseButton;