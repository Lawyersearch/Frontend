import { useCallback, useState } from "react";

export const useBoolean = (
    initial: boolean,
): [state: boolean, setTrue: () => void, setFalse: () => void, toggle: () => void] => {
    const [state, setState] = useState(initial);
    const setTrue = useCallback(() => setState(true), []);
    const setFalse = useCallback(() => setState(false), []);
    const toggle = useCallback(() => setState(state => !state), []);
    return [state, setTrue, setFalse, toggle];
};
