import useEventListener from "./useEventListener";

const useEnterPress = (cb: () => void, pure = false) =>
    useEventListener("keypress", ev => {
        if (ev.key === "Enter" && (!pure || (!ev.metaKey && !ev.ctrlKey))) {
            cb();
        }
    });

export default useEnterPress;
