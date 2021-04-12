import { store } from "react-notifications-component";
export const notifyCopied = () => {
  store.addNotification({
    title: "Succesfully Copied to Clipboard",
    message: "Share the event with your friends ! ",
    type: "info",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};

export const notifyLiked = () => {
  store.addNotification({
    title: "Added to Favourites !",
    message: "You can access with ease in your profile.",
    type: "danger",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};

export const notifyClubLiked = () => {
  store.addNotification({
    title: "Added to Favourites !",
    message: "You can access with ease in your profile.",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate_animated", "animate_fadeIn"],
    animationOut: ["animate_animated", "animate_fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};

export const notifyWentWrong = () => {
  store.addNotification({
    title: "Something went wrong",
    message: "Cannot add to favourite",
    type: "danger",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};

export const notifyDownload = () => {
  store.addNotification({
    title: "File Downloading Started... !",
    message: "The File will be ready to open in no time.",
    type: "success",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate_animated", "animate_fadeIn"],
    animationOut: ["animate_animated", "animate_fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};

export const notifySuccessSignUp = () => {
  store.addNotification({
    title: "Your Account is Succesfully Created.",
    message: "You can now login via email and password.",
    type: "success",
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate_animated", "animate_fadeIn"],
    animationOut: ["animate_animated", "animate_fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};

export const notifySuccessLogin = (name) => {
  store.addNotification({
    title: "Succesfully Logged In",
    message: "Welcome " + name + " !",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};
