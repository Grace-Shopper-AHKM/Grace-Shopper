const DISPLAY_FORM = 'DISPLAY_FORM';

export function displayForm(displayBool, editBool, bookToEdit) {
    return {
        type: DISPLAY_FORM,
        displayBool,
        editBool,
        bookToEdit
    }
}

export default function displayFormReducer(state = [], action) {
    switch (action.type) {
        case DISPLAY_FORM:
            return [action.displayBool, action.editBool, action.bookToEdit];
        default:
            return state;
    }
}