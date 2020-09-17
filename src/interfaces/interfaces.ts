export interface IListUsers {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: string;
    registration_timestamp: number;
    photo: string;
}

export interface IUsersActions {
    showButton: boolean;
}

export interface IResponseShowMoreUsers {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: {
        next_url: string;
        prev_url: string;
    };
    users: IListUsers[];
}

export interface IUserComponent {
    phone: string;
    name: string;
    email: string;
    photo: string;
    position: string;
}

export interface IHintComponent {
    hintText: string;
    coords: {
        top: string;
        left: string;
    }
}

export type IShowMoreButtonComponentProps = {
    onClick: () => void
}

export interface IPositionsArray {
    id: number;
    name: string;
}

export interface IGetPosition {
    success: boolean;
    positions: IPositionsArray[];
}

export interface IRegistrationRadiosComponent {
    onChange: (event: any) => void;
}

export interface IValidation {
    showAlert: string;
    postSuccess: boolean;
    postFailed: string;
    showProgress: boolean
}

export interface IGetToken {
    success: boolean;
    token: string;
}

export interface IImageSizes {
    width: number,
    height: number
}

export type IClearForm = () => void;

// -------------------------------

export interface IRootState {
    users: IListUsers[],
    usersActions: IUsersActions,
    positions: IPositionsArray[],
    validation: IValidation
}



