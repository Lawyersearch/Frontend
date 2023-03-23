import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import CollapsedList from "../CollapsedList";
import { useState } from "react";


const OrderTypes = () => {
    const [expanded, setExpanded] = useState(false);
    const types = [
        {type: 0, label: "Мои заказы", Icon: PersonIcon},
        {type: 1, label: "Все заказы", Icon: PublicIcon},
    ];

    return (
        <CollapsedList title={"Заказы"} expanded={expanded} onToggle={()=>setExpanded(!expanded)}>
            <List>
                {types.map(({type, label, Icon}) => (
                    <ListItem key={type}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon/>
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CollapsedList>
    );
};

export default OrderTypes;
