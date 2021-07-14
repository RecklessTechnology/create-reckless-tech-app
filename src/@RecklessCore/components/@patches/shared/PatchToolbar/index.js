import useAppContext from '../../../../contexts/useAppContext';
import PatchToolbarView from './view';

const PatchToolbar = ({ parents, uuid }) => {
  const { removeThreeObj } = useAppContext();
  return <PatchToolbarView {...{parents, uuid, removeThreeObj}} />
}

PatchToolbar.whyDidYouRender = true;

export default PatchToolbar;