export enum LangCodeEnum {
    EN = "en",
    VI = "vi",
}

export enum MessageValidateForm {
    Required = "This field is required.",
    InvalidUrl = "Please enter a valid url.",
    InvalidEmail = "Please enter a valid email address",
    RequiredUpload = "Please upload file",
    ConfirmPassword = "New passwords and confirming passwords are not the same.",
}

export enum NotificationTypeEnum {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info",
}

export enum NotificationMessageEnum {
    CreateSuccess = "Create successfully",
    UpdateSuccess = "Update successfully",
    DeleteSuccess = "Delete successfully",

    CreateError = "Create failed",
    UpdateError = "Update failed",
    DeleteError = "Delete failed",

    LoginSuccess = "Login successfully",
    LoginError = "Login failed",

    UploadSuccess = "Upload successfully",
    UploadError = "Upload failed",

    ClearCacheSuccess = "Clear cache successfully",
    ClearCacheError = "Clear cache failed",

    ResetPasswordError = "Reset password failed",

    ChangePasswordSuccess = "Change password successfully",
    ChangePasswordError = "Change password failed",
}

export enum NotificationTitleEnum {
    Success = "Success",
    Error = "Error",
    Warning = "Warning",
    Info = "Info",
}

export enum StatusEnum {
    Activated = "Activated",
    Deactivated = "Deactivated",
}

export enum DeviceTypeEnum {
    Mobile = "Mobile",
    Desktop = "Desktop",
    Tablet = "Tablet",
}
