import {green, red} from 'chalk';

export const success = () => {
  process.stdout.write(green(' ✓\n'));
  process.exit(0);
};

export const fail = () => {
  process.stdout.write(red(' ✗\n'));
  process.exit(1); // fail
};
