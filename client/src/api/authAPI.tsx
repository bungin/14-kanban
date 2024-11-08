import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // DO: make a POST request to the login route
  try {
    const response = await fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("User info not retrieved, check network tab.");
    }

    return data;
  } catch (err) {
    console.log("User login error: ", err);
    return Promise.reject("could not fetch user login info");
  }
};




export { login };
