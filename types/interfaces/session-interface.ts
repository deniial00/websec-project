interface Session {
    uuid: string;
    isLoggedIn: boolean;
    username: string | undefined;
    token: string | undefined;
}

export type { Session };