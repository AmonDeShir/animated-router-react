var isAnimation = function (object) {
    if (!object) {
        return false;
    }
    return (typeof object.time === 'number' && typeof object.animation === 'function');
};
export default isAnimation;
