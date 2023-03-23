export const isOrderOpen = (status: number) => status === 0;
export const isOrderInWork = (status: number) => status === 1;
export const isOrderCompleted = (status: number) => status === 2;
export const isOrderClosed = (status: number) => status === 3;
export const isOrderDismissed = (status: number) => status === 4;
export const isOrderDisputed = (status: number) => status === 5;
