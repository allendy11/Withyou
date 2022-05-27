module.exports = {
  spinnerOn: (setLoading) => {
    const body = document.body;
    const spinner = document.querySelector("#spinner");
    body.style.opacity = 0.6;
    setLoading(true);
  },
  spinnerOff: (setLoading) => {
    const body = document.body;
    setLoading(false);
    body.style.opacity = "unset";
  },
};
