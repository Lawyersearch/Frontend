import { useCallback, useMemo, useState } from "react";
import _isEmpty from "lodash/isEmpty";
import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import PendingIcon from "@mui/icons-material/Pending";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import FlagIcon from "@mui/icons-material/Flag";
import CollapsedList from "../../ui/components/CollapsedList";
import { Order, OrderType, OrderStatus, ClientOrder, PerformerOrder } from "../../types/order";

interface OrderTypesListProps {
    onTypeClick: (type: OrderType) => void;
    onStatusClick: (type: OrderStatus | null) => void;
    orders: { [key in OrderType]: ClientOrder[] | PerformerOrder[] }; // eslint-disable-line no-unused-vars
}

const OrderTypesList = ({ onTypeClick, onStatusClick, orders }: OrderTypesListProps) => {
    const [myExpanded, setMyExpanded] = useState(false);
    const [mobExpanded, setMobExpanded] = useState(false);

    const getPrivateOrdersStatusCount = useCallback(
        (status: OrderStatus) => {
            console.log('status now is: ', status);
            const res = (orders[OrderType.PRIVATE] as Order[]).reduce(
                (acc, { orderStatus }) => acc + +(orderStatus === status),
                0,
            );
            console.log('status counted: ', res);
            return res;
        },
        [orders],
    );

    const statuses = useMemo(
        () =>
            [
                { label: "Открытые", Icon: PendingIcon, status: OrderStatus.OPEN },
                { label: "В работе", Icon: BusinessCenterIcon, status: OrderStatus.IN_WORK },
                { label: "Завершенные", Icon: CheckIcon, status: OrderStatus.COMPLETED },
                { label: "Закрытые", Icon: CloseIcon, status: OrderStatus.CLOSED },
                { label: "Отклоненные", Icon: DoDisturbIcon, status: OrderStatus.DISMISS },
                { label: "Спорные", Icon: FlagIcon, status: OrderStatus.DISPUT },
            ].map((item) => Object.assign(item, { count: getPrivateOrdersStatusCount(item.status) })),
        [getPrivateOrdersStatusCount],
    );

    const personalParentClickHandler = useCallback(() => {
        onStatusClick(null);
        onTypeClick(OrderType.PRIVATE);
        setMyExpanded(state => !state);
    }, [onTypeClick, onStatusClick, setMyExpanded]);

    const publicParentClickHandler = useCallback(() => {
        onStatusClick(null);
        onTypeClick(OrderType.PUBLIC);
        setMyExpanded(false);
    }, [onTypeClick, onStatusClick, setMyExpanded]);

    return (
        <CollapsedList title="Заказы" expanded={mobExpanded} onToggle={() => setMobExpanded(!mobExpanded)}>
            <List>
                <ListItemButton disabled={_isEmpty(orders[OrderType.PRIVATE])} onClick={personalParentClickHandler}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Мои заказы" />
                    <Chip label={orders[OrderType.PRIVATE]?.length || 0} />
                </ListItemButton>
                <Collapse in={myExpanded} timeout="auto" unmountOnExit>
                    <List>
                        {statuses
                            .filter(({ count }) => count)
                            .map(({ label, Icon, status, count }, index) => (
                                <ListItemButton key={index} sx={{ pl: 4 }} onClick={() => onStatusClick(status)}>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                    <Chip label={count} />
                                </ListItemButton>
                            ))}
                    </List>
                </Collapse>
                <ListItemButton disabled={_isEmpty(orders[OrderType.PUBLIC])} onClick={publicParentClickHandler}>
                    <ListItemIcon>
                        <PublicIcon />
                    </ListItemIcon>
                    <ListItemText primary="Все заказы" />
                    <Chip label={orders[OrderType.PUBLIC]?.length || 0} />
                </ListItemButton>
            </List>
        </CollapsedList>
    );
};

export default OrderTypesList;
