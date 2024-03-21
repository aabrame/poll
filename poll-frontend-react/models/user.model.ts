import { Poll } from "./poll.model";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  polls: Poll[];
}

