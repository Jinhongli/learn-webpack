
export default ( text = 'default') => {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element;
};