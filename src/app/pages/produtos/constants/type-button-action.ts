export enum TYPE_BUTTON_ACTION {
  ADICIONAR = 1,
  EDITAR = 2,
  EXCLUIR = 3,
}

export const getTextTypeButtonAction = (action: TYPE_BUTTON_ACTION): string => {
  switch (action) {
    case TYPE_BUTTON_ACTION.ADICIONAR:
      return 'Adicionar';
    case TYPE_BUTTON_ACTION.EDITAR:
      return 'Editar';
    default:
      return 'Excluir';
  }
};
