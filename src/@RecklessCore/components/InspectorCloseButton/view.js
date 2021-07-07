import { memo } from 'react'

import { IconButton } from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';

const InspectorCloseButtonView = ({ inspectorMenuOpen, setInspectorMenuOpen }) => {
  return (
    <IconButton onClick={()=>{
      setInspectorMenuOpen(!inspectorMenuOpen)
    }}>
      <CloseIcon/>
    </IconButton>
  );
}

InspectorCloseButtonView.whyDidYouRender = true;

export default memo(InspectorCloseButtonView);