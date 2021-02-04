### Slicer-File

![GitHub](https://img.shields.io/github/license/UrijHoruzij/slicer-file) ![GitHub package.json version](https://img.shields.io/github/package-json/v/UrijHoruzij/slicer-file)

---

This library allows you to upload files in chunks.

---

```js
import { slicer, support } from "slicer";

const url = "url";
const headers = {};
const file = {};
const size = 1024 * 1024;
const data = {
  user: "1",
  date: new Date(),
};
let callback = () => {};
let stopFlag = {
  stop: true,
};
if (support()) {
  slicer(url, headers, file, size, data, callback, stopFlag);
}
```

#### URL:

- url + /status — checking how many bytes have already been uploaded to the server.
- url + /upload — loading a file with chunks.

#### Parameters:

- url — url of the server
- headers — request headers
- file — the file that you want to transfer
- size — the size of the chunk
- data — information to be transmitted with the file
- callback — the function that is called when the chunk is successfully sent
- stopFlag — the object that needs to be changed in order to stop sending the file

### Callback:

- name
- progress
- id
- data
