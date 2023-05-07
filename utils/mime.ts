export const image = ["jpeg", "png"].map(type => `image/${type}`).join(", ");

export const rarArchive = ["vnd.rar", "x-rar-compressed", "octet-stream"].map(type => `application/${type}`).join(", ");
export const zipArchive = ["zip", "x-zip-compressed"]
    .map(type => `application/${type}`)
    .concat("multipart/x-zip")
    .join(", ");
export const archive = [rarArchive, zipArchive].join(", ");

export const plainText = "text/plain";

export const msWord = ["msword", "vnd.openxmlformats-officedocument.wordprocessingml.document"]
    .map(type => `application/${type}`)
    .join(", ");
export const msExcel = ["vnd.ms-excel", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
    .map(type => `application/${type}`)
    .join(", ");
export const msPpt = ["vnd.ms-powerpoint", "vnd.openxmlformats-officedocument.presentationml.presentation"]
    .map(type => `application/${type}`)
    .join(", ");
export const msDoc = [msWord, msExcel, msPpt].join(", ");

export const document = [image, archive, plainText, msDoc].join(", ");

export default {
    image,
    rarArchive,
    zipArchive,
    archive,
    plainText,
    msWord,
    msExcel,
    msPpt,
    msDoc,
    document,
};
