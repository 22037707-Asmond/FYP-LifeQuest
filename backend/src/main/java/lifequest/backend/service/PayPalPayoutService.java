package lifequest.backend.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lifequest.backend.configs.PayPalConfig;
import okhttp3.Credentials;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Service
public class PayPalPayoutService {
    private final OkHttpClient httpClient = new OkHttpClient();
    
    @Autowired
    private PayPalConfig payPalConfig;

    // Method to create a Payout
    public String createPayout(String recipientEmail, String amount) throws IOException {
        String url = "https://api.sandbox.paypal.com/v1/payments/payouts";

        String credential = Credentials.basic(payPalConfig.getClientId(), payPalConfig.getClientSecret());

        String json = "{ \"sender_batch_header\": { \"sender_batch_id\": \"" + System.currentTimeMillis() + "\", \"email_subject\": \"You have a payout!\" },\"items\": [{ \"recipient_type\": \"EMAIL\", \"amount\": { \"value\": \"" + amount + "\", \"currency\": \"SGD\" }, \"receiver\": \"" + recipientEmail + "\", \"note\": \"Thanks for your services!\", \"sender_item_id\": \"item_id_1\" }] }";

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Authorization", credential)
                .addHeader("Content-Type", "application/json")
                .build();

        Response response = httpClient.newCall(request).execute();
        return response.body().string();
    }
}