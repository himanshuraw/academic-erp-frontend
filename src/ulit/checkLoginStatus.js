export const checkLoginStatus = () => {
    const token = localStorage.getItem("jwt");

    if (token) {
        try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.exp && decoded.exp > currentTime) {
                return { isLoggedIn: true, username: decoded.sub };
            } else {
                console.log(`${currentTime} >= ${decoded.exp}`)
                console.log("expired");
                localStorage.removeItem("jwt");
                return { isLoggedIn: false };
            }
        } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("jwt");
            return { isLoggedIn: false };
        }
    }
    return { isLoggedIn: false };
};
