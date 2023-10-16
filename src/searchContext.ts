import { createContext } from "react";
import { SetStateAction, Dispatch } from "react";

export const searchapps = createContext(
  {} as {
    searchValue: string;
    setsearchValue: Dispatch<SetStateAction<string>>;
  }
);
