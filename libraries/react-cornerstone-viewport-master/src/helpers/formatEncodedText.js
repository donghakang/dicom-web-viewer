import iconv from 'iconv-lite';

export default function decodeMessage(str) {
  if (iconv.encodingExists('cp949') && iconv.encodingExists('iso-8859-1')) {
    return iconv.decode(iconv.encode(str, 'iso-8859-1'), 'cp949');
  } else {
    return str;
  }
}
