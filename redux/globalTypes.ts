export const GLOBALTYPES = {
    AUTH: 'AUTH',
    USERINFO: 'USERINFO',
    ALERT: 'ALERT',
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    USER_TYPE: 'USER_TYPE',
    SOCKET: 'SOCKET',

    // imageLink: 'https://widenout.tk/uploads/avatars/',
    // uploadsLink: 'https://widenout.tk/uploads/media/',
    // coversLink: 'https://widenout.tk/uploads/covers/',
    // apiEndPoint: 'https://widenout.tk/api/endpoints/',

    imageLink: 'https://jw-widenout.com/uploads/avatars/',
    uploadsLink: 'https://jw-widenout.com/uploads/media/',
    coversLink: 'https://jw-widenout.com/uploads/covers/',
    apiEndPoint: 'https://jw-widenout.com/api/endpoints/',

    // imageLink: 'http://192.168.1.134/widenout/web/uploads/avatars/',
    // uploadsLink: 'http://192.168.1.134/widenout/web/uploads/media/',
    // coversLink: 'http://192.168.1.134/widenout/web/uploads/covers/',
    // apiEndPoint: 'http://192.168.1.134/api/endpoints/',

    // imageLink: 'http://192.168.1.176/widenout/wno/uploads/avatars/default.png',
};

export const EditData = (data: any[], id: any, post: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const newData = data.map((item: { _id: any; }) => (item._id === id ? post : item));
    return newData;
};

export const DeleteData = (data: any[], id: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const newData = data.filter((item: { _id: any; }) => item._id !== id);
    return newData;
};
