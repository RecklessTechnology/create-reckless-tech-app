import React, { useEffect, useRef } from 'react';

import { Html } from '@react-three/drei';

// import { HTML, HTMLProps } from 'drei';
import useAppContext from './contexts/useAppContext';

export default function HtmlOverlay({ children, ...props }) {
    const { paused } = useAppContext();
    const node = useRef();

    useEffect(() => {
        if (node.current?.parentElement) {
            node.current.parentElement.style.pointerEvents = 'none';
            node.current.parentElement.style.whiteSpace = 'nowrap';
        }
    });

    if (paused) return null;

    return (
        <Html ref={node} zIndexRange={[0, 0]} eps={0.1} {...props}>
            {children}
        </Html>
    );
}
