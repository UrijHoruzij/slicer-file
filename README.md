<p align="center">
  <img src="./assets/logo.png" alt="Slicer-File logo" width="128" height="128">
  <h1 align="center">Slicer-File</h1>
</p>
<p align="center">
    <a aria-label="License" href="https://github.com/UrijHoruzij/slicer-file/blob/master/LICENSE">
      <img alt="GitHub" src="https://img.shields.io/github/license/UrijHoruzij/slicer-file?color=62c089">
    </a>
    <a aria-label="Version" href="https://github.com/UrijHoruzij/slicer-file/blob/master/package.json">
      <img alt="Version" src="https://img.shields.io/github/package-json/v/UrijHoruzij/slicer-file?color=62c089">
    </a>
  </p>

This library allows you to upload files in chunks.

## Used

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

#### Callback:

- name
- progress
- id
- data

## License

Slicer-File is released under the [GNU 3 License](https://github.com/UrijHoruzij/slicer-file/blob/master/LICENSE).