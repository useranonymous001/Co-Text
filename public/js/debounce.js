const debounce = (func, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(() => func(context, args), delay);
  };
};

export default debounce;
