### Slicer-File

![GitHub](https://img.shields.io/github/license/UrijHoruzij/slicer-file) ![GitHub package.json version](https://img.shields.io/github/package-json/v/UrijHoruzij/slicer-file)

---

This library allows you to upload files in chunks.

---

```js
import { slicer, support } from "slicer";

const data = {
  user: "1",
  date: new Date(),
};
if (support()) {
  slicer("url", 1024 * 1024, data);
}
```
