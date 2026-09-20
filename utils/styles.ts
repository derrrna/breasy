import colors from "@/utils/colors";

export const DROP_SHADOW = {
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
};

// Lighter variant for free-floating cards, where the shadow shows on every side.
export const CARD_SHADOW = {
    ...DROP_SHADOW,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
};
