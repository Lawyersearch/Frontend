import useEventListener from "./useEventListener";

const useEnterPress = (cb: () => void) =>
    useEventListener("keypress", ev => {
        if (ev.key === "Enter") {
            cb();
        }
    });

export default useEnterPress;
