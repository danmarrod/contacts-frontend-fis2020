class ContactsApi {
    static API_BASE_URL = "/api/v1";

    static requestHeaders() {

        return {}
    }

    static getAllContacts() {
        const headers = this.requestHeaders();
        const request = new Request(ContactsApi.API_BASE_URL + "/contacts", {
            method: 'GET',
            header: headers
        });

        // async method which return a object with a future json response
        return fetch(request).then(response => {
            return response.json();
        });

    }

}


export default ContactsApi;