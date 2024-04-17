export interface IChangePasswordRequest {
    id: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}