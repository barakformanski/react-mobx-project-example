export interface Status {
  title: string;
  initial: boolean;
  _id: string;
}

export interface Transition {
  title: string;
  from: { _id: string; title: string; initial: boolean };
  to: { _id: string; title: string };
  _id: string;
}
