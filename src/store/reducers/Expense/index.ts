import { Dispatch } from 'redux';

export enum UserActionEnum {
    RETRIEVE_USER_EXPENSE = 'USER/RETRIEVE_USER_EXPENSE',
    CREATE_USER_EXPENSE = 'USER/CREATE_USER_EXPENSE',
}

interface IInitialState {}

interface IRetrieveUser {
    type: UserActionEnum.RETRIEVE_USER_EXPENSE;
    payload: IInitialState[];
}

interface IUpdateUser {
    type: UserActionEnum.CREATE_USER_EXPENSE;
    payload: IInitialState;
}

type IAction = IRetrieveUser | IUpdateUser;

const initialState: IInitialState[] = [];

export default function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case UserActionEnum.RETRIEVE_USER_EXPENSE:
            return [...action.payload];
        case UserActionEnum.CREATE_USER_EXPENSE:
            return [...state, action.payload];
        default:
            return state;
    }
}

const retrieveUserFromBackendExpense = async () => {
    const storedExpenses = localStorage.getItem('userExpenses');
    return storedExpenses ? JSON.parse(storedExpenses) : [];
};

export const retrieveUserInfoExpense =
    () => async (dispatch: Dispatch<{ type: string; payload: any }>) => {
        try {
            const expenses = await retrieveUserFromBackendExpense();
            dispatch({
                type: UserActionEnum.RETRIEVE_USER_EXPENSE,
                payload: expenses,
            });
        } catch (e) {
            console.error("Error retrieving user expenses:", e);
        }
    };

export const createUserInfoExpense =
    (values: IInitialState) => async (dispatch: Dispatch<{ type: string; payload: any }>) => {
        try {
            const existingExpenses = await retrieveUserFromBackendExpense();
            const updatedExpenses = [...existingExpenses, values];
            localStorage.setItem('userExpenses', JSON.stringify(updatedExpenses));
            dispatch({
                type: UserActionEnum.CREATE_USER_EXPENSE,
                payload: values,
            });
        } catch (e) {
            console.error("Error creating user expense:", e);
        }
    };
