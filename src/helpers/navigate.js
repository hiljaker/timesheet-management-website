const navigate = (url = "") => window.history.pushState({}, null, url);

export default navigate;
