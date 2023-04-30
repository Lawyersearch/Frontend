import { Box, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppSelector } from "../../hooks/redux/useTypedRedux";
import { PerformerOrder } from "../../types/order";
import { MyOffer, Offer } from "../../types/offer";
import { mkCreatorName } from "../../utils/user";
import GenericOfferCard from "./Generic";
import useEditOffer from "../../hooks/offer/useEditOffer";
import useRecallOffer from "../../hooks/offer/useRecallOffer";
import DeleteConfirmModal from "../../ui/modal/DeleteConfirm";
import UpdateOfferModal from "../../ui/modal/offer/Update";
import { shouldShowCancellOffer, shouldShowEditOffer } from "../../utils/order";

interface PerformerOfferCardProps {
    order: PerformerOrder;
    onRecall: () => void;
    onEdit: (newOffer: MyOffer) => void;
}

const PerformerOfferCard = ({ order, onRecall, onEdit }: PerformerOfferCardProps) => {
    const self = useAppSelector(store => store.user.self);
    const myOffer = order.myOffer;
    const completeOffer: Offer = { ...myOffer!, avatar: self?.avatar!, creatorName: mkCreatorName(self) };

    const [showRecallModal, openRecallModal, closeRecallModal, recall] = useRecallOffer(myOffer, onRecall);
    const [showEditModal, openEditModal, closeEditModal, edit] = useEditOffer(myOffer, onEdit);

    const showEditOffer = shouldShowEditOffer(self, order);
    const showCancelOffer = shouldShowCancellOffer(self, order);
    const showOfferControls = showEditOffer || showCancelOffer;

    return (
        <Box px={2} py={1}>
            {showOfferControls && (
                <Stack direction="row" justifyContent="flex-end" mb={-4.5}>
                    {showEditOffer && (
                        <IconButton onClick={openEditModal} color="info" sx={{ ml: "auto" }}>
                            <EditIcon />
                        </IconButton>
                    )}
                    {showCancelOffer && (
                        <IconButton onClick={openRecallModal} color="error">
                            <ClearIcon />
                        </IconButton>
                    )}
                </Stack>
            )}
            <GenericOfferCard offer={completeOffer} />
            <UpdateOfferModal offer={myOffer} open={showEditModal} onClose={closeEditModal} edit={edit} />
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
