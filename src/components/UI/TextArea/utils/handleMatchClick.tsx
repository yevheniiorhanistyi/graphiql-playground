import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export const handleMatchClick = (
  match: string,
  inputValueRef: MutableRefObject<string>,
  setMatches: Dispatch<SetStateAction<string[]>>
) => {
  inputValueRef.current = match;
  setMatches([]);
};
