package lifequest.backend.configs;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

public class BlobConfig extends JsonSerializer<Blob> {

    @Override
    public void serialize(Blob blob, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (blob == null) {
            jsonGenerator.writeNull();
            return;
        }

        try {
            byte[] bytes = blob.getBytes(1, (int) blob.length());
            String base64Encoded = Base64.getEncoder().encodeToString(bytes);
            jsonGenerator.writeString(base64Encoded);
        } catch (SQLException e) {
            // Handle the SQLException here
            e.printStackTrace();
        }
    }
}

