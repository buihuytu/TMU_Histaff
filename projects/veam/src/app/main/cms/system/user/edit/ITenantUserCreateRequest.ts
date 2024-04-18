import { AbstractControl, FormGroup } from "@angular/forms";

export interface ITenantUserCreateRequest {
    id?: string;
    userName: string;
    fullname: string;
    groupId: number;
    password: string;
    passwordConfirm: string;
    isPortal: boolean;
    isWebapp: boolean;
    isAdmin: boolean;
    startDate: Date;
    endDate: Date;
    employeeCode?: string;
    employeeName?: string;
    empId?: number;
    testChecklist?: number[];
    avatar?: string;
    avatarFileData?: string;
    avatarFileName?: string;
    avatarFileType?: string;
}

export interface ITenantUserFormGroup extends FormGroup {
    value: ITenantUserCreateRequest;

    controls: {
        id?: AbstractControl;
        userName: AbstractControl;
        groupId: AbstractControl;
        password: AbstractControl;
        passwordConfirm: AbstractControl;
        isPortal: AbstractControl;
        isWebapp: AbstractControl;
        isAdmin: AbstractControl;
        employeeCode?: AbstractControl;
        employeeName?: AbstractControl;
        empId?: AbstractControl;
        avatar?: AbstractControl;
        avatarFileName?: AbstractControl;
        avatarFileType?: AbstractControl;
    };
}