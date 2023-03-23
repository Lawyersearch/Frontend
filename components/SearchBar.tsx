import React from "react";
import {
    Autocomplete,
    TextField,
    Stack,
    IconButton,
    styled,
    Typography,
    Box,
    FormControl,
    InputLabel,
    NativeSelect,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CategoryView } from "../types/category";
import { useAppSelector } from "../hooks/redux/useTypedRedux";

const StyledInputField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
}));

interface SearchBarProps {
    switchCategory: (arg: CategoryView | { id: number; label: string }) => void;
    searchQuery?: { id?: number; label: string };
}

const SearchBar = ({ switchCategory, searchQuery }: SearchBarProps) => {
    const options = useAppSelector(store => store.ui.categoryView);

    const onNativeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const id = +ev.target.value;
        if (id) {
            const option = options?.find(opt => opt.id === id);
            if (option) {
                switchCategory(option);
            }
        }
    };

    const isEqualToValue = (option: CategoryView, value: { id: number; label: string }) => option.id === value.id;
    const onAutocompleteChange = (_: any, option: CategoryView | null) => {
        if (option) {
            switchCategory(option);
        }
    };

    return (
        <>
            <FormControl sx={{ m: 2, display: { xs: "block", md: "none" } }}>
                <InputLabel variant="standard" htmlFor="native-input" sx={{ "~ div": { width: 1 } }}>
                    Категория
                </InputLabel>
                <NativeSelect
                    inputProps={{ id: "native-input" }}
                    value={searchQuery?.id ?? 0}
                    onChange={onNativeChange}
                >
                    <option value={0} key={0} disabled>
                        Выберите категорию
                    </option>
                    {options?.map(opt => (
                        <option value={opt.id} key={opt.id}>
                            {opt.label}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
            <Stack direction="row" m={2} sx={{ display: { xs: "none", md: "flex" } }}>
                <Autocomplete
                    renderInput={params => <StyledInputField {...params} label="Категория" />}
                    value={searchQuery as any}
                    options={options ?? []}
                    isOptionEqualToValue={isEqualToValue}
                    onChange={onAutocompleteChange}
                    renderOption={(props, option: CategoryView) => (
                        <li {...props}>
                            <Box>{option.label}</Box>
                            <Box ml="auto" display={{ xs: "none", md: "block" }}>
                                <Typography variant="body2" color="text.secondary">
                                    {option.parents.map(parent => parent.label).join(" > ")}
                                </Typography>
                            </Box>
                        </li>
                    )}
                    fullWidth={true}
                />
                <IconButton
                    sx={{
                        color: "white",
                        backgroundColor: "primary.main",
                        borderRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        "&:hover": {
                            backgroundColor: "primary.dark",
                        },
                    }}
                >
                    <SearchIcon fontSize="large" />
                </IconButton>
            </Stack>
        </>
    );
};

export default React.memo(SearchBar, (a, b) => a.searchQuery?.id === b.searchQuery?.id);
