export const exActionTypes = {
  SET_EXAMPLE: 'EX.SET_EXAMPLE'
};

export function setExample(example: string) {
  return {
    type: exActionTypes.SET_EXAMPLE,
    payload: example
  }
}
