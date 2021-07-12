import { useContext } from 'react';
import { TransformsContext } from '../managers/TransformsManager';

export default function useTransformsContext() {
    return useContext(TransformsContext);
}
