import {copyFile,cp,mkdir} from 'node:fs/promises';
await mkdir('assets',{recursive:true});
await cp('dist/assets','assets',{recursive:true});
await copyFile('dist/index.html','index.html');
