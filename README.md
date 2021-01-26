### Slicer-File

![GitHub](https://img.shields.io/github/license/UrijHoruzij/slicer-file) ![GitHub package.json version](https://img.shields.io/github/package-json/v/UrijHoruzij/slicer-file)

---

This library allows you to upload files in chunks.

---

```js
import { slicer, support } from "slicer";

const headers = {};
const file = {};
const data = {
  user: "1",
  date: new Date(),
};
let stopFlag = {
  stop: true,
};
if (support()) {
  slicer("url", headers, file, 1024 * 1024, data, callback, stopFlag);
}
```

#### URL:

- url + /status — checking how many bytes have already been uploaded to the server.
- url + /upload — loading a file with chunks.

### Callback:

- name
- progress
- id
- data
