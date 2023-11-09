import { child, get, getDatabase, ref, remove, set, update } from 'firebase/database';
import { EMPTY_USER } from '../constants';

export default class DatabaseService {

  userPrefix = 'user-';

  getFilters = async (options = {}) => {
    const { category } = options;

    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `filters/`));

    if (!snapshot.exists()) return;

    const data = snapshot.val();
    return data.filter((p) => p.category === category);
  }

  getProducts = async (options = {}) => {
    const { id, category, callback } = options;

    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `products/${id ?? ''}`));

    if (!snapshot.exists()) return;
    const data = snapshot.val();

    if (category) {
      return data.filter((p) => p.category === category);
    }
    if (callback) {
      return callback(data);
    }
    return data;
  }

  getUser = async (options = {}) => {
    const { id, login } = options;

    if (login) {
      const dbRef = ref(getDatabase());
      const snapshot = await get(child(dbRef, 'users/'));

      if (!snapshot.exists()) return;
  
      const data = snapshot.val(); 
      const user = Object.values(data).filter((u) => u.login === login);
      return user.length ? user : null;
    }

    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${this.userPrefix + id}`));

    if (!snapshot.exists()) return;
    return snapshot.val();
  }

  getUsers = async () => {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, 'users/'));

    if (!snapshot.exists()) return;
    return snapshot.val();
  }

  setUser = async (id, user) => {
    const db = getDatabase();
    await set(ref(db, `users/${this.userPrefix + id}`), user);
  }
  
  setUserField = async (id, field, data) => {
    const db = getDatabase();
    await update(ref(db), {
      [`users/${this.userPrefix + id}/${field}`]: data
    });
  }

  removeUser = async (id) => {
    const db = getDatabase();
    await remove(ref(db, `users/${this.userPrefix + id}`));
  }

  generateId = async () => {
    const users = await this.getUsers();
    if (!users) return 1;

    let id = Object.values(users)
              .map((u) => u.id)
              .reduce((acc, current) => current && Math.max(acc, current));
    return ++id;
  }

  registerUser = async (login, password, currentData) => {
    const { id, watched, shoppingCart } = currentData;
    const newId = id ?? await this.generateId();

    const newUser = {
      ...EMPTY_USER, 
      login, 
      password, 
      id: newId,
      watched, 
      shoppingCart,
      isAuthed: true
    };

    await this.setUser(newId, newUser);
    return newUser;
  }

  loginUser = async (login, password) => {
    const users = await this.getUsers();
    if (!users) return false;
    
    let user = Object.values(users).find((u) => {
      if (u) {
        return u.login === login && u.password === password
      } 
      else {
        return false;
      }
    });

    if (user) {
      user = {
        ...user,
        isAuthed: true
      };

      await this.setUser(user.id, user);
      return user;
    }
    else {
      return false;
    }
  }
}
