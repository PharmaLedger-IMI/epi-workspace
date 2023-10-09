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
    const {sessionExpiryTime} = parseCookies(document.cookie);
    if (sessionExpiryTime && parseInt(sessionExpiryTime) < Date.now()) {
        clearInterval(handler);
        window.disableRefreshSafetyAlert = true;
        window.location = "/logout"
    }
}, 1000);