const jwt = require('jsonwebtoken');

export function getToken({ login }) {
    return jwt.sign({ user: "Murf" }, 'olololilol');
}

export function validateToken(token) {
    try {
        return jwt.verify(token, "olololilol");
    } catch (err) {
        return false;
    }
}