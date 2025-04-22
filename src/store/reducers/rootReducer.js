import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
// import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
// import adminReducer from "../actions/adminAction"
import adminReducer from "./adminReducer"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};



const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key:'app',
    whitelist:['language']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig,appReducer),
    admin: adminReducer
    
});

// export default (history) => {
//     const rootReducer = combineReducers({
//         router: connectRouter(history),
//         user: persistReducer(userPersistConfig, userReducer),
//         app: persistReducer(appPersistConfig, appReducer),
//         admin: adminReducer
//     });

//     // console.log("Root reducer state (admin):", rootReducer); // Kiểm tra admin sau khi combineReducers

//     return rootReducer;
// };

