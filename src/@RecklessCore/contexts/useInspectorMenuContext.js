import { useContext } from 'react';
import { InspectorMenuContext } from '../managers/InspectorMenuManager';

export default function useInspectorMenuContext() {
    return useContext(InspectorMenuContext);
}
