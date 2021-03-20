export const globalActionTypes = {
  SET_MESSAGE: 'GLOBAL.SET_MESSAGE',
  SET_DATA: 'GLOBAL.SET_DATA',
  SET_MODAL: 'GLOBAL.SET_MODAL',
};

export function setGlobalMessage(isOpen: boolean, message: string, type: string) {
  return {
    type: globalActionTypes.SET_MESSAGE,
    payload: { isOpen, message, type }
  }
}

export function setGlobalData(data: any) {
  return {
    type: globalActionTypes.SET_DATA,
    payload: data
  }
}