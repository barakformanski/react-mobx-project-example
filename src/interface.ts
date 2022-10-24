export interface Status {
  title: string;
  description: string | undefined;
  _id?: any;
}

export interface Transition {
  title: string;
  from: string | undefined;
  to: string | undefined;
  _id?: any;
}
