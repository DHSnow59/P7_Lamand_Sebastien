//Service de récupération du TOKEN pour faire les requetes 
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        // for Node.js Express back-end
        return { "authorization": user.accessToken };
    } else {
        return {};
    }
}