import _isEmpty from "lodash/isEmpty";
import { Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import CollapsedList from "../../ui/components/CollapsedList";
import { useState } from "react";
import { Order } from "../../types/order";

interface OrderTypesListProps {
    onTypeClick: (type: number) => void;
    orders: [myOrders: Order[], allOrders: Order[]];
}

const OrderTypesList = ({ onTypeClick, orders }: OrderTypesListProps) => {
    const [expanded, setExpanded] = useState(false);
    const types = [
        { label: "Мои заказы", Icon: PersonIcon },
        { label: "Все заказы", Icon: PublicIcon },
    ];

    return (
        <CollapsedList title="Заказы" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
            <List>
                {types.map(({ label, Icon }, index) => (
                    <ListItem key={index}>
                        <ListItemButton disabled={_isEmpty(orders[index])} onClick={() => onTypeClick(index)}>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                            <Chip label={orders[index]?.length || 0} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CollapsedList>
    );
};

export default OrderTypesList;
