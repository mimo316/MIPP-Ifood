const callback = () => {
    console.log("I was called!");
    setTimeout(callback, 5000);
};
callback();