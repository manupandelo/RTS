const getRowSpacing = (params) => {
    return {
        top: params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5,
    };
};

export default getRowSpacing;
