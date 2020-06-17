const icons = {
    "dir": "/images/folder.png",
    "mfg": "/images/game.png",
    "pdf": "/images/pdf.png",
    "png": "/images/image.png",
    "jpg": "/images/image.png",
    "jpeg": "/images/image.png",
    "bmp": "/images/image.png",
}


function getFileIconHref(isDir, ext) {
    if (isDir) {
        return icons.dir;
    }
    if (icons?.[ext] !== undefined) {
        return icons[ext];
    }

    return "/images/video.png";
}

async function getFileInfos(realPath) {
    const fs = await import('fs');
    const mime = await import('mime-types');
    const path = await import('path');

    const fileStat = fs.statSync(realPath);

    return {
        name: path.basename(realPath) == "nas" ? "/" : path.basename(realPath),
        mime: mime.lookup(realPath),
        isDir: fileStat.isDirectory(),
        href: realPath.replace(/.*\/nas/g, ""),
        arrayPath: realPath.replace(/.*\/nas/g, "") == "/" ? [] : realPath.replace(/.*\/nas\//g, "").split("/"),
        size: fileStat.size,
        extension: realPath.split('.').pop(),
        iconHref: getFileIconHref(fileStat.isDirectory(), realPath.split('.').pop())
    }

}

export async function getFile(loc = "") {

    const fs = await import('fs');
    const path = await import('path');

    let realPath;

    if (loc == "") {
        realPath = "./nas/";
    } else {
        realPath = "./nas/" + ((loc[0] === "/") ? loc.slice(1) : loc);
    }

    const fileInfos = await getFileInfos(realPath);

    if (!fileInfos.isDir) {
        return fileInfos;
    }

    const files = fs.readdirSync(path.resolve(realPath)).filter(e => !(/(^|\/)\.[^\/\.]/g).test(e));

    const fileListInfos = await Promise.all(files.map(async (file) => {
        const filePath = `${path.resolve(realPath)}/${file}`;
        const fileInfo = await getFileInfos(filePath);
        return fileInfo;
    }));

    const children = fileListInfos.sort((a, b) => (a.isDir && b.isDir) ? (a.name.localeCompare(b.name)) : (a.isDir) ? -1 : (b.isDir) ? 1 : (a.name.localeCompare(b.name)));

    return { ...fileInfos, children };
}