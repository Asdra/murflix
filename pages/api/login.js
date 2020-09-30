const { getToken, validateToken } = require('@lib/auth');

/** 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * */
export default async (req, res) => {

    let body = JSON.parse(req.body);
    //console.log(body);

    if (body?.token && validateToken(body.token)) {
        res.statusCode = 200;
        res.end();
        return;
    }

    if (!body.password || body.password !== "awesomePassword") {
        res.statusCode = 405;
        res.end();
        return;
    }

    const token = getToken("Murf");
    res.statusCode = 200;
    res.write(JSON.stringify({ token }));
    res.end();

}
