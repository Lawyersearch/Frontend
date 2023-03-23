import { Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import CollapsedList from "../CollapsedList";
import { useState } from "react";
import { Order } from "../../types/order";

interface OrderTypesProps {
    onTypeClick: (type: number) => void;
    orders: Order[][]
}

const OrderTypes = ({onTypeClick, orders}: OrderTypesProps) => {
    const [expanded, setExpanded] = useState(false);
    const types = [
        {type: 0, label: "Мои заказы", Icon: PersonIcon},
        {type: 1, label: "Все заказы", Icon: PublicIcon},
    ];

    return (
        <CollapsedList title="Заказы" expanded={expanded} onToggle={()=>setExpanded(!expanded)}>
            <List>
                {types.map(({type, label, Icon}) => (
                    <ListItem key={type}>
                        <ListItemButton onClick={() => onTypeClick(type)}>
                            <ListItemIcon>
                                <Icon/>
                            </ListItemIcon>
                            <ListItemText primary={label} />
                            <Chip label={orders[type].length}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CollapsedList>
    );
};

export default OrderTypes;
