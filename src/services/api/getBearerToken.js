function getBearerToken() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    if (!profile) {
        this.props.history.push('/login');
    }
    return 'Bearer ' + profile.token
}
export default getBearerToken;
