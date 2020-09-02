import colors from 'colors';

export const info = (...str: any[]) => {
  str.forEach((e: any) => {
    // tslint:disable-next-line: no-console
    console.log(colors.green(e));
  });
};

export const clientError = (...str: any[]) => {
  str.forEach((e: any) => {
    // tslint:disable-next-line: no-console
    console.log(colors.yellow(e));
  });
};

export const serverError = (...str: any[]) => {
  str.forEach((e: any) => {
    // tslint:disable-next-line: no-console
    console.log(colors.red(e));
  });
};

export const debug = (...str: any[]) => {
  str.forEach((e: any) => {
    // tslint:disable-next-line: no-console
    console.log(colors.gray(e));
  });
};