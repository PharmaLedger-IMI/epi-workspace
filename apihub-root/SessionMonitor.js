function parseCookies(cookies) {
    const parsedCookies = {};
    if (!cookies) {
        return parsedCookies;
    }
    let splitCookies = cookies.split(";");
    splitCookies = splitCookies.map(splitCookie => splitCookie.trim());
    splitCookies.forEach(cookie => {
        const cookieComponents = cookie.split("=");
        const cookieName = cookieComponents[0].trim();
        let cookieValue = cookieComponents[1].trim();
        if (cookieValue === "null") {
            cookieValue = undefined;
        }
        parsedCookies[cookieName] = cookieValue;
    })

    return parsedCookies;
}

const handler = setInterval(() => {
    const {sessionExpiryTime, logout} = parseCookies(document.cookie);
    if(logout === "true"){
        alert("A Single Sign-On (SSO) login process is detected to be in progress across multiple browser instances. If this assessment is incorrect, kindly terminate all browser instances and recommence the login procedure.");
        return;
    }
    if (sessionExpiryTime && parseInt(sessionExpiryTime) < Date.now()) {
        clearInterval(handler);
        window.disableRefreshSafetyAlert = true;
        window.location = "/logout"
    }
}, 1000);