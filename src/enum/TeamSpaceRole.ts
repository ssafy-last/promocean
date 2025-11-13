export enum TeamSpaceRole {
    READ_ONLY = 10,
    EDIT = 20,
    OWNER = 30
}

export type SpaceRole = keyof typeof TeamSpaceRole

export const ChangeSpaceRoleToValue = (role: SpaceRole): number => {
    return TeamSpaceRole[role];
}