
export const checkEntryPoint = (data) => {
    if (!data.username || !data.password ||
        data.username.length < 6 || data.password.length < 6) {
        return false;
    }
    return true;
}