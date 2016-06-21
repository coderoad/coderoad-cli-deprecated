interface PJErrors {
  name: string;
  msg: string;
  example: string;
}

interface PJKeys extends PJErrors {
  name: string;
  validate: (content: string) => boolean;
  config?: boolean;
  optional?: boolean;
}

interface ValidatePjOutput {
  errors: PJErrors[];
  warnings: PJErrors[];
}
