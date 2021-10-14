import path from 'path';

const createPath = (page) => path.resolve('views', `${page}.ejs`);

export default createPath;
