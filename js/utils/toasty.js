var options = {
  transition: "slideLeftRightFade",
  duration: 2500,
  enableSounds: true,
  progressBar: true,
  sounds: {
      info: "./node_modules/egalink-toasty.js/dist/sounds/info/2.mp3",
      success: "./node_modules/egalink-toasty.js/dist/sounds/success/1.mp3",
      warning: "./node_modules/egalink-toasty.js/dist/sounds/warning/1.mp3",
      error: "./node_modules/egalink-toasty.js/dist/sounds/error/3.mp3",
  }
};

var toast = new Toasty();
toast.configure(options);

export const toastSuccess = (msg = "Success") => toast.success(msg);
export const toastInfo = (msg = "Information") => toast.info(msg);
export const toastError = (msg = "Error") => toast.error(msg);

