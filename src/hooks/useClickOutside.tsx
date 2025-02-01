import { useEffect } from 'react';

export default function useClickOutiside(ref: React.RefObject<HTMLElement>, callback: (e: MouseEvent) => void) {
    useEffect(() => {
        const clickOutsideFn = (e: MouseEvent) => {
            // console.log(e)
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback(e);
            }
        };

        document.addEventListener("mousedown", (e) => clickOutsideFn(e));
        return () => document.removeEventListener("mousedown", clickOutsideFn);
    }, [ref]);
};