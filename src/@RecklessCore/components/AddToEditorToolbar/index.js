import { forwardRef } from 'react';

import AddToEditorToolbarView from './view';

const AddToEditorToolbar = (props, ref) => {
  return <AddToEditorToolbarView {...{...props, ref}} />
}

AddToEditorToolbar.whyDidYouRender = true;

export default forwardRef(AddToEditorToolbar);