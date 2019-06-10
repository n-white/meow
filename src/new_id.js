import UUID from 'node-uuid';

import IdGenerator from './id_generator';
import URLSafeBase64 from 'urlsafe-base64';

export default function() {

  IdGenerator.newId = () => {
    // UUID is 128-bit
    // Buffer class takes number of octets (8 bits)
    // 128 bits / 8 bits = 16 octets
    var buffer = new Buffer(16);
    UUID.v4({}, buffer);
    return URLSafeBase64.encode(buffer);
  };
  return IdGenerator;
}
