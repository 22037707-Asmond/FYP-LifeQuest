package lifequest.backend.configs;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

import javax.sql.rowset.serial.SerialBlob;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class BlobConfig {

    public static class BlobSerializer extends JsonSerializer<Blob> {
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
                throw new IOException("Failed to serialize Blob", e);
            }
        }

    public static class BlobDeserializer extends JsonDeserializer<Blob> {
        @Override
        public Blob deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
            String base64Encoded = jsonParser.getText();
            byte[] bytes = Base64.getDecoder().decode(base64Encoded);
            try {
                return new SerialBlob(bytes);
            } catch (SQLException e) {
                throw new IOException("Failed to deserialize Blob", e);
            }
        }
    }
}
}
