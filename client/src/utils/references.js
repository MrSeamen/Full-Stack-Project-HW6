module.exports = {
//get icons
    getIcon: prop => {
        let icons = {
            password: 'mdi-help-circle',
            user: 'mdi-account-circle',
            login: 'mdi-login',
            delete: 'mdi-close-circle',
            logout: 'mdi-logout',
            dashboard: 'mdi-view-dashboard'
        }
        return icons[prop] || '';
    },
//get toasts
    getToast: prop => {
        let toasts = {
            genericFormError: `Form has errors!`
        }
        return toasts[prop] || ``;
    }
}