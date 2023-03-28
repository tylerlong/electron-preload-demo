import { run } from 'shell-commands';

const main = async () => {
  await run('rm -rf build');
  run("nodemon --watch src/preload.ts --exec 'parcel build --target preload'");
  run('parcel src/index.html --dist-dir build -p 1234');
  run('parcel watch --target electron -p 1235');
};

main();
