import { RefObject, useEffect, useRef } from "react";
import _isBoolean from "lodash/isBoolean";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

/* eslint no-undef: 0 */
function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event: WindowEventMap[K]) => void,
    capture?: boolean,
): void;

// eslint-disable-next-line no-redeclare
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(
    eventName: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    element: RefObject<T>,
    capture?: boolean,
): void;

// eslint-disable-next-line no-redeclare
function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    T extends HTMLElement | void = void,
>(
    eventName: KW | KH,
    handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
    elementOrCapture?: RefObject<T> | boolean,
    capture?: boolean,
) {
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement: T | Window = (elementOrCapture as RefObject<T>)?.current || window;
        if (!(targetElement && targetElement.addEventListener)) {
            return;
        }
        const eventListener: typeof handler = event => savedHandler.current(event);
        capture = capture ?? (_isBoolean(elementOrCapture) ? Boolean(elementOrCapture) : undefined);
        targetElement.addEventListener(eventName, eventListener, { capture });
        return () => {
            targetElement.removeEventListener(eventName, eventListener);
        };
    }, [eventName, elementOrCapture]);
}

export default useEventListener;
