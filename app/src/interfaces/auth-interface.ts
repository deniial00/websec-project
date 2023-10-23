interface AuthContextValue {
    uuid: string | undefined;
    is_logged_in: boolean;
    username: string | undefined;
}

export type { AuthContextValue };