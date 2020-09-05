import { exec } from 'child_process';
import { validateToken } from '@lib/auth';

/** 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * */
export default async (req, res) => {

    if (!req ?.query ?.token || !validateToken(req.query.token)) {
        res.statusCode = 405;
        res.end();
    }

    if (!req ?.query ?.url) {
        res.statusCode = 400;
        res.end();
    }

    let url = req ?.query ?.url;

    try {
        await updateYTDL();
    } catch (err) {
        //res.end("updateYTDL error");
    }

    try {
        let json = await getInfosRessource(url);
        let dwnld = await downloadAudio(url);
        res.end(dwnld);
    } catch (err) {
        res.end(err.message);
        res.end("getInfosRessource error");
    }
}

async function downloadAudio(url, destPath = "") {
    const cmd = `youtube-dl -x --audio-format 'mp3' -f 'bestaudio/best' -o 'ytdl/%(title)s.%(ext)s'  ${url}`;

    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve(stdout);
        });
    });
}

async function getInfosRessource(url) {
    const cmd = `youtube-dl -j ${url}`;

    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve(stdout);
        });
    });
}

async function updateYTDL() {
    return new Promise((resolve, reject) => {
        exec("su do -H pip install --upgrade youtube-dl", (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}