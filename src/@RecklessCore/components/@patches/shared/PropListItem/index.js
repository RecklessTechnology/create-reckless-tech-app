import PropListItemView from './view';

const PropListItem = ({children, uuid, propName, disableInput, disableOutput}) => {
  return <PropListItemView {...{ uuid: uuid, propName: propName, disableInput: disableInput, disableOutput: disableOutput }}>{children}</PropListItemView>;
}

PropListItem.whyDidYouRender = false;

export default PropListItem;