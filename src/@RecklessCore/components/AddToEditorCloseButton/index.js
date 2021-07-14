import AddToEditorCloseButtonView from './view';

const AddToEditorCloseButton = ({ handleClose }) => {
  return <AddToEditorCloseButtonView handleClose={handleClose} />;
}

AddToEditorCloseButton.whyDidYouRender = true;

export default AddToEditorCloseButton;