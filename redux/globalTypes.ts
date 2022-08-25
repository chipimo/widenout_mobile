export const GLOBALTYPES = {
    AUTH: 'AUTH',
    USERINFO: 'USERINFO',
    ALERT: 'ALERT',
    THEME: 'THEME',
    STATUS: 'STATUS',
    MODAL: 'MODAL',
    USER_TYPE: 'USER_TYPE',
    SOCKET: 'SOCKET'
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
