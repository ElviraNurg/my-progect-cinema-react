import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../utils/Variables/constants";
export const getMovies = createAsyncThunk(
    'movies',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${URL}`);
            if (!response.ok) {
                throw new Error('Error')
            }
            return response.json();
        } catch (error) {
            return rejectWithValue(error.message)
        }
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
        addMovies(state, action){
            state.movies=action.payload
        }
    },
    extraReducers: {
        [getMovies.pending]: (state, action) => {
            state.isLoading=true
        },
        [getMovies.fulfilled]: (state, action) => {
            /* state.movies={
                country
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
                thumbnail,
                movieId: id,
              } */
            state.movies = action.payload.map(movie=>{
                return{
                    ...movie,
                    image: `https://api.nomoreparties.co/${movie.image.url}`,
                    
                }
            }); 

            //console.log(state.movies);
            localStorage.setItem('movies', JSON.stringify(action.payload));
            state.isLoading = false;
        },
        [getMovies.rejected]: (state, action) => {
            state.error = action.payload;
        }

    }
}
)
// console.log('moviesSlice.actions' ,moviesSlice.actions);
export const { getData, addMovies } = moviesSlice.actions
export default moviesSlice.reducer
