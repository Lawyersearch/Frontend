export const feedBacksString = (feedBacks?: number) => {
    if (!feedBacks) {
        return "Нет отзывов";
    }
    if (feedBacks > 9 && feedBacks < 20) {
        return `${feedBacks} отзывов`;
    }
    const lastDigit = feedBacks % 10;
    if (lastDigit === 1) {
        return `${feedBacks} отзыв`;
    }
    if (lastDigit < 5) {
        return `${feedBacks} отзыва`;
    }
    return `${feedBacks} отзывов`;
};

export const experienceString = (experience?: number) => {
    if (!experience) {
        return "Нет опыта";
    }
    if (experience < 12) {
        if (experience === 1) {
            return `${1} месяц`;
        }
        if (experience < 5) {
            return `${experience} месяца`;
        }
        return `${experience} месяцев`;
    }
    const years = Math.floor(experience / 12);
    if (years === 1) {
        return `${years} год`;
    }
    if (years < 5) {
        return `${years} года`;
    }
    return `${years} лет`;
};
