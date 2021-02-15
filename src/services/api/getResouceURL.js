function getImageURL(name, size) {
    return "http://localhost:8003/ftp/img?name=" + name + "&type=" + size
}
export default getImageURL;
