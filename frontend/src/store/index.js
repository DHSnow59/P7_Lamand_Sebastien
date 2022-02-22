import { createStore } from "vuex";
import { auth } from "./auth.module";

// création du store
const store = createStore({
    modules: {
        auth,
    },
});

export default store;