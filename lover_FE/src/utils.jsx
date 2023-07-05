export const addErrorIntoField = (errors) => errors ? { error: true } : { error: false };
export const pawdRegExp = /^.{6,12}$/;
export const userName =/^[a-zA-Z0-9_]{3,20}$/;
export const defaultValidate =/^[a-zA-Z]{2,}$/;
export const  email = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const  clearLocalStorage = () => {
  localStorage.removeItem("expanded");
  localStorage.removeItem("selected");
};