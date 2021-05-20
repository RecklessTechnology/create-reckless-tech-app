import { useEffect, useRef, useState } from 'react';

export default function useStateFromProp(
    prop
) {
    const [state, setState] = useState(prop);
    const initial = useRef(true);

    useEffect(() => {
        if (!initial.current) {
            setState(prop);
        }
        initial.current = false;
    }, [prop]);

    return [state, setState];
}
