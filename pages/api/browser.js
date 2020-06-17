import { getFile } from "@lib/files";
import fs from 'fs';
import path from 'path';
import { validateToken } from '@lib/auth';

/** 
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * */
export default async (req, res) => {

    if (!req?.query?.token || !validateToken(req.query.token)) {
        res.statusCode = 405;
        res.end();
    }

    if (req.query?.path) {
        const file = await getFile(req.query.path);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(file));
        return;
    }

    if (req.query?.href && req.query?.download == 1) {
        const file = await getFile(req.query.href);
        const realPath = path.resolve("./nas" + file.href);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', file.mime);
        res.setHeader('Content-Length', file.size);
        res.setHeader('Content-disposition', `attachment; filename="${file.name}"`);
        const reader = fs.createReadStream(realPath);
        reader.pipe(res);
        return;
    }

    if (req.query?.href) {

        let reader;
        const file = await getFile(req.query.href);
        const realPath = path.resolve("./nas" + file.href);

        let rangeRequest = readRangeHeader(req.headers['range'], file.size);
        //console.log(rangeRequest);

        if (rangeRequest !== null) {

            const start = rangeRequest.Start;
            const end = rangeRequest.End;


            if (start >= file.size || end >= file.size) {
                res.setHeader('Content-Ranges', 'bytes */' + file.size);
                res.statusCode = 416;
                res.end(null);
                return;
            }

            res.statusCode = 206;
            const rangeHeader = req.headers.range;
            const startByte = rangeHeader.replace("bytes=", "").slice(0, -1);

            res.setHeader('Content-Range', `bytes ${start}-${end}/${file.size}`);
            res.setHeader('Content-Length', start == end ? 0 : (end - start + 1));
            res.setHeader('Content-Type', file.mime);
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Cache-Control', 'no-cache');

            reader = fs.createReadStream(realPath, {
                start,
                end
            });
        } else {
            res.statusCode = 200;

            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Type', file.mime);
            res.setHeader('Content-Length', file.size);

            reader = fs.createReadStream(realPath);
        }
        reader.pipe(res);
    }
}

function readRangeHeader(range, totalLength) {
    /*
     * Example of the method 'split' with regular expression.
     * 
     * Input: bytes=100-200
     * Output: [null, 100, 200, null]
     * 
     * Input: bytes=-200
     * Output: [null, null, 200, null]
     */

    if (range == null || range.length == 0)
        return null;

    var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
    var start = parseInt(array[1]);
    var end = parseInt(array[2]);
    var result = {
        Start: isNaN(start) ? 0 : start,
        End: isNaN(end) ? (totalLength - 1) : end
    };

    if (!isNaN(start) && isNaN(end)) {
        result.Start = start;
        result.End = totalLength - 1;
    }

    if (isNaN(start) && !isNaN(end)) {
        result.Start = totalLength - end;
        result.End = totalLength - 1;
    }

    return result;
}