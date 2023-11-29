export class APIUtils {

    constructor(apiRequest,loginUrl, loginPayload){
        this.apiRequest = apiRequest;
        this.loginUrl = loginUrl;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiRequest.post(this.loginUrl, {data: this.loginPayload});
        const reponseJson = await loginResponse.json(); // convert response to JSON
        const token = reponseJson.token; // Get the token from the reponse JSON
        return token;
    }

    async createOrder(createOrderUrl, createOrderPayload){
        const orderResponse = await this.apiRequest.post(createOrderUrl,
            {
                data: createOrderPayload,
                headers: {
                    'Authorization': await this.getToken(),
                    'Content-Type': 'application/json'
                }
            });
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        return orderId;
    }
}
