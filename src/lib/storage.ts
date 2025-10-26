export const generateAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "undefined null"
  )}&background=random`;

export const setLocalstorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalstorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData; //? JSON.parse(storedData) : null;
};
export const removeLocalStorageData = (key: string) => {
  localStorage.removeItem(key);
};

export const setCookie = ({ name, value }: { name: string; value: string }) => {
  document.cookie = `${name}=${value}; path=/; HttpOnly Secure`;
};

export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export function clearCookie(name: string = "token") {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
