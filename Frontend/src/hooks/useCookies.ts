import { useState, useEffect } from "react";

export const useCookies = () => {
  const [storedUserData, setStoredUserData] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  const getCookies = () => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const userDataCookie = cookies.find((cookie) =>
      cookie.startsWith("Zephyron=")
    );

    if (userDataCookie) {
      const cookieValue = decodeURIComponent(userDataCookie.split("=")[1]);
      const parsedValue = JSON.parse(cookieValue);
      return parsedValue;
    }

    return null;
  };

  const setCookies = (user: object) => {
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    document.cookie = `Zephyron=${encodeURIComponent(
      JSON.stringify(user)
    )}; expires=${expirationDate.toUTCString()}; path=/`;
    setStoredUserData(user);
  };

  useEffect(() => {
    const parsedCookies = getCookies();
    if (parsedCookies) {
      setStoredUserData(parsedCookies);
    }
    setLoading(false);
  }, []);

  return { cookies: storedUserData, setCookies, loading };
};
