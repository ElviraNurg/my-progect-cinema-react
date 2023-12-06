import {configureStore} from '@reduxjs/toolkit';
import reducer from './RootReduser';

export default configureStore({
    reducer: {datas: reducer}
})