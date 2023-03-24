import _isEmpty from "lodash/isEmpty";
import { Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import CollapsedList from "../CollapsedList";
import { useState } from "react";
import { Order, OrderType } from "../../types/order";

interface OrderTypesProps {
    onTypeClick: (type: number) => void;
    orders: { [key in keyof typeof OrderType]: Order[] };
}

const OrderTypes = ({ onTypeClick, orders }: OrderTypesProps) => {
    const [expanded, setExpanded] = useState(false);
    const types = [
        { type: OrderType.PRIVATE, label: "Мои заказы", Icon: PersonIcon },
        { type: OrderType.PUBLIC, label: "Все заказы", Icon: PublicIcon },
    ];

    return (
        <CollapsedList title="Заказы" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <List>
                {types.map(({ type, label, Icon }) => (
                    <ListItem key={type}>
                        <ListItemButton disabled={_isEmpty(orders[type])} onClick={() => onTypeClick(type)}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                            <Chip label={orders[type].length} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CollapsedList>
    );
};

export default OrderTypes;
