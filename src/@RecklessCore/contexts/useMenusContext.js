import { useContext } from 'react';
import { MenusContext } from '../App';

export default function useMenusContext() {
    return useContext(MenusContext);
}
