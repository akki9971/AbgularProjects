export class StorageService {
  static _() {
    return new StorageService();
  }

  get(key: string) {
    try {
      return window.localStorage.getItem(key);
    } catch (err) {
      // console.log(err);
      return null;
    }
  }

  set(key: string, value: any) {
    return window.localStorage.setItem(key, value);
  }

  destroy(key: string) {
    return window.localStorage.removeItem(key);
  }

  clear() {
    return window.localStorage.clear();
  }
}
