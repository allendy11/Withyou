module.exports = {
  loadingOn: (setLoading) => {
    const body = document.body;
    const spinner = document.querySelector("#spinner");
    body.style.opacity = 0.6;
    setLoading(true);
  },
  loadingOff: (setLoading) => {
    const body = document.body;
    setLoading(false);
    body.style.opacity = "unset";
  },
};
