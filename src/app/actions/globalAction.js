export const globalActionTypes = {
  SET_MESSAGE: 'GLOBAL.SET_MESSAGE',
  SET_DATA: 'GLOBAL.SET_DATA',
};

export function setGlobalMessage(isOpen, message, type) {
  return {
    type: globalActionTypes.SET_MESSAGE,
    payload: { isOpen, message, type }
  }
}

export function setGlobalData(data) {
  return {
    type: globalActionTypes.SET_DATA,
    payload: data
  }
}
