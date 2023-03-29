import { Box, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppSelector } from "../../hooks/redux/useTypedRedux";
import { MyOffer, Offer } from "../../types/offer";
import { mkCreatorName } from "../../utils/user";
import GenericOfferCard from "./Generic";
import useEditOffer from "../../hooks/offer/useEditOffer";
import useRecallOffer from "../../hooks/offer/useRecallOffer";
import DeleteConfirmModal from "../../ui/modal/DeleteConfirm";
import EditOfferModal from "../../ui/modal/offer/Edit";

interface PerformerOfferCardProps {
    offer: MyOffer;
    onRecall: () => void;
    onEdit: (newOffer: MyOffer) => void;
}

const PerformerOfferCard = ({ offer, onRecall, onEdit }: PerformerOfferCardProps) => {
    const self = useAppSelector(store => store.user.self);
    const completeOffer: Offer = { ...offer, avatar: self?.avatar!, creatorName: mkCreatorName(self) };

    const [showRecallModal, openRecallModal, closeRecallModal, recall] = useRecallOffer(offer, onRecall);
    const [showEditModal, openEditModal, closeEditModal, edit] = useEditOffer(offer, onEdit);

    return (
        <Box px={2} py={1}>
            <Stack direction="row" justifyContent="flex-end" mb={-4.5}>
                <IconButton onClick={openEditModal} color="info" sx={{ ml: "auto" }}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={openRecallModal} color="error">
                    <ClearIcon />
                </IconButton>
            </Stack>
            <GenericOfferCard offer={completeOffer} />
            <EditOfferModal offer={offer} open={showEditModal} onClose={closeEditModal} edit={edit} />
            <DeleteConfirmModal
                show={showRecallModal}
                setHide={closeRecallModal}
                onConfirm={recall}
                confirmString="Отменить отклик?"
            />
        </Box>
    );
};

export default PerformerOfferCard;
