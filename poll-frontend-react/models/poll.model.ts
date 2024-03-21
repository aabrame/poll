import { Option } from "./option.model";
import { User } from "./user.model";

export interface Poll {
  id: number;
  name: string;
  options: Option[];
  creator: User;
}
