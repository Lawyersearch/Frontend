import { MyOffer, Offer } from "../types/offer";
import { User } from "../types/user";

export const isMyOffer = (self: User | null, offer: Offer | MyOffer) => self?.id === offer.userId;
