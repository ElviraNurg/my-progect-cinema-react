import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../utils/Variables/constants";
export const getMovies = createAsyncThunk('movies', async () => {
    const data = await fetch(`${URL}`);
    return data.json();
}
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        error: null,
        isLoading: false,
    },
    reducers: {
         async getData(state, action) {
            state.isLoading=true;
           const data = await fetch('https://api.nomoreparties.co/beatfilm-movies')
           console.log('data = > ',data);
                // .then((response) => {
                //     if (response.ok) {
                //         console.log('fetch', response.json());
                //         console.log('fetch state.movies', state.movies);
                //         //state.isLoading=false;
                //         // state.movies = response.json();
                //     }
                //     throw new Error(`${response.status} ${response.statusText}`)
                // })
                //  .catch(error => {
                //     state.error = error;
                //     state.isLoading=false;
                // }) 
        }, 
    },
    extraReducers: {
        [getMovies.fulfilled]: (state, action) => {
            state.movies = action.payload;
            state.isLoading = false;
        }

    }
}
)
// console.log('moviesSlice.actions' ,moviesSlice.actions);
export const { getData } = moviesSlice.actions
export default moviesSlice.reducer
