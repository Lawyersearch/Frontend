import React, { useCallback, useRef } from "react";

const useUpdateItem = <T extends { id: string }>(setEds: React.Dispatch<React.SetStateAction<T[]>>) => {
    const updateRef = useRef<{ open: (item: T) => void } | undefined>();
    const openUpdateModal = useCallback((education: T) => {
        updateRef.current?.open(education);
    }, []);
    const onUpdate = useCallback(
        (qualification: T) => {
            setEds(state => state.map(ed => (ed.id === qualification.id ? qualification : ed)));
        },
        [setEds],
    );
    return { updateRef, openUpdateModal, onUpdate };
};

export default useUpdateItem;
