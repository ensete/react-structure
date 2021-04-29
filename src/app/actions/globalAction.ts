export const globalActionTypes = {
  SET_DATA: 'GLOBAL.SET_DATA',
  SET_MODAL: 'GLOBAL.SET_MODAL',
};

export function setGlobalData(data: any) {
  return {
    type: globalActionTypes.SET_DATA,
    payload: data
  }
}

export function setGlobalModal(key: string, isOpened: boolean) {
  return {
    type: globalActionTypes.SET_MODAL,
    payload: { key, isOpened }
  }
}