import { useBoolean } from "../useBoolean";
import React, { useCallback, useEffect, useRef } from "react";

type rtkRemoveItemHook = () => [(id: string) => void, { isSuccess: boolean }];

const useRemoveItem = <T extends { id: string }>(
  hook: rtkRemoveItemHook,
  setEds: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const [removeEducation, { isSuccess: isRemoveSuccess }] = hook();
  const [showConfirm, setShowConfirm, setHideConfirm] = useBoolean(false);
  const removeModalData = useRef<T | null>(null);
  const onConfirmDelete = useCallback(() => {
    removeEducation(removeModalData.current!.id!);
  }, [removeModalData.current?.id]);
  useEffect(() => {
    if (isRemoveSuccess) {
      setEds((state) =>
        state.filter((ed) => ed.id !== removeModalData.current?.id)
      );
    }
  }, [isRemoveSuccess]);
  const openRemoveModal = (ed: T) => {
    removeModalData.current = ed;
    setShowConfirm();
  };
  return {
    showConfirm,
    setHideConfirm,
    onConfirmDelete,
    openRemoveModal,
    removingItem: removeModalData.current,
  };
};

export default useRemoveItem;
