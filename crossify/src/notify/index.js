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

export const notifyWrongEmail = () => {
  store.addNotification({
    title: "This Email doesn't exist",
    message: "your enter emailId don't found in our data",
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export const notifySuccessMail = (name) => {
  store.addNotification({
    title: "Email Sent Successfully",
    message: "We send the reset password link in mail",
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

export const notifyWrongLink = () => {
  store.addNotification({
    title: "This Link doesn't exist",
    message: "your enter link is Wrong",
    type: "danger",
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export const notifySuccessPassword = () => {
  store.addNotification({
    title: "Password Reset",
    message: "Your password successfully changed",
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

export const notifySuccessClub = () => {
  store.addNotification({
    title: "Successfully club created",
    message: "club are successfully created",
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

export const notifyIncorrectInput = () => {
  store.addNotification({
    title: "The Input is not correct.",
    message: "The process is abonded due to wrong/incorrect Input.",
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
