import UUID from 'node-uuid';
import URLSafeBase64 from 'urlsafe-base64';

export function newId() {
    // UUID is 128-bit
    // Buffer class takes number of octets (8 bits)
    // 128 bits / 8 bits = 16 octets
    var buffer = new Buffer(16);
    UUID.v4({}, buffer);
    return URLSafeBase64.encode(buffer);
}
