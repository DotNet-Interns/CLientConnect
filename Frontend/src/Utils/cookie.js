export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"; // Path=/ makes the cookie available for the entire site
  };

  export const getCookie = (name) => {
    const value = `; ${document.cookie}`; 
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift(); 
    return null; 
  };