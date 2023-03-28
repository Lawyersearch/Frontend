import React, { useCallback, useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import { Box, styled, SvgIconProps, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { CategoryTree } from "../../types/category";
import CollapsedList from "../../ui/components/CollapsedList";

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightLight,
        "&.Mui-expanded": {
            fontWeight: theme.typography.fontWeightMedium,
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: "inherit",
            color: "inherit",
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

const StyledTreeItem = ({ labelIcon, labelInfo, labelText, ...other }: StyledTreeItemProps) => (
    <StyledTreeItemRoot
        label={
            <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
                <Box component={labelIcon} color="inherit" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: "inherit", flexGrow: 1 }}>
                    {labelText}
                </Typography>
                <Typography variant="caption" color="inherit">
                    {labelInfo}
                </Typography>
            </Box>
        }
        {...other}
    />
);

interface CategoriesProps {
    tree: CategoryTree[];
    category: { selected: string; expanded: string[] };
    switchCategory: (arg: { id: number; label: string; expanded: string[] }) => void;
}

const Categories = ({ tree, category, switchCategory }: CategoriesProps) => {
    const [mobExpanded, setMobExpanded] = useState(false);
    const [expanded, setExpanded] = useState<string[]>(category.expanded);
    const [selected, setSelected] = useState<string>(category.selected);

    useEffect(() => {
        setSelected(category.selected);
        setExpanded(category.expanded);
    }, [category.selected]);

    const handleClick = (node: CategoryTree) => {
        if (!node.childs?.length) {
            switchCategory({ id: node.id, label: node.title, expanded });
            setSelected(String(node.id));
            mobExpanded && setMobExpanded(false);
        }
    };

    const onCollapsedToggle = useCallback(() => {
        if (mobExpanded) {
            setSelected("");
            setExpanded([]);
            setMobExpanded(false);
        } else {
            setMobExpanded(true);
        }
    }, [setSelected, setExpanded, setMobExpanded]);

    return (
        <CollapsedList
            title="Категории"
            titleAlignment="space-between"
            expanded={mobExpanded}
            onToggle={onCollapsedToggle}
        >
            <TreeView
                disableSelection={!mobExpanded}
                selected={selected}
                expanded={expanded}
                onNodeToggle={(_ev: any, nodeIds: string[]) => setExpanded(nodeIds)}
                onNodeSelect={(_ev: any, nodeIds: string) => setSelected(nodeIds)}
                defaultCollapseIcon={<ArrowDropDownIcon fontSize="large" />}
                defaultExpandIcon={<ArrowRightIcon fontSize="large" />}
                sx={{
                    height: "fit-content",
                    flexGrow: 1,
                    pr: { xs: 0, md: 3 },
                    userSelect: "none",
                    ml: { xs: "-15px", md: 0 },
                }}
            >
                {tree.map(fNode => (
                    <StyledTreeItem
                        nodeId={fNode.id.toString()}
                        key={fNode.id}
                        labelText={fNode.title}
                        sx={{ m: { xs: 0 }, md: 2 }}
                    >
                        {fNode.childs?.map(sNode => (
                            <StyledTreeItem
                                nodeId={sNode.id.toString()}
                                key={sNode.id}
                                labelText={sNode?.title}
                                onClick={() => handleClick(sNode)}
                            >
                                {sNode.childs?.map(tNode => (
                                    <StyledTreeItem
                                        nodeId={tNode.id.toString()}
                                        key={tNode.id}
                                        labelText={tNode?.title}
                                        onClick={() => handleClick(tNode)}
                                    />
                                ))}
                            </StyledTreeItem>
                        ))}
                    </StyledTreeItem>
                ))}
            </TreeView>
        </CollapsedList>
    );
};

export default React.memo(Categories, (a, b) => a.category.selected === b.category.selected);
