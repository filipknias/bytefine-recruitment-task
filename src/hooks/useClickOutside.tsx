import { useEffect } from 'react';

export default function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        const clickOutsideFn = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", clickOutsideFn);
        return () => document.removeEventListener("mousedown", clickOutsideFn);
    }, [ref, callback]);
};