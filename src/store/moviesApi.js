import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMovies = createAsyncThunk('movies', async () => {
    const data = await fetch('https://api.nomoreparties.co/beatfilm-movies');
    return data.json();
}
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        error: null,
        isLoading: false,
        searchValue: '',
        filtredMovies: [],
        savedMovies: [],//сохраненные фильмы
        clickedShorts: false,//нажат или нет переключатель короткометражки
        displayedList: [],//список отображаемых фильмов
        liked: null, //лайкнут фильм или нет
        displayedSaveList: [],//список отображаемых фильмов сохраненных
        disabledMoreButton:false,//кнопка еще активная или нет
    },
    reducers: {
        /* getData(state, action) {
            state.isLoading=true;
            fetch('https://api.nomoreparties.co/beatfilm-movies')
                .then((response) => {
                    if (response.ok) {
                        //state.isLoading=false;
                        state.movies = response.json();
                    }
                    throw new Error(`${response.status} ${response.statusText}`)
                })
                 .catch(error => {
                    state.error = error;
                    state.isLoading=false;
                }) 
        }, */
        handleChange(state, action) {
            state.searchValue = action.payload.e.target.value;
        },
        //Фильтр по названию фильма
        handleFilter(state, action) {
            state.filtredMovies = state.movies.filter((item) => item.nameRU.toLowerCase() === state.searchValue.toLowerCase() || item.nameEN.toLowerCase() === state.searchValue.toLowerCase());
        },
        handleFilterShorts(state) {
            state.filtredMovies = state.movies.filter((item) => item.duration < 40);
        },
        getMoreButtunStatus(state){
            if(state.filtredMovies.length-state.displayedList.length<=0){
                state.disabledMoreButton=true}
        },
        handlePushMore(state, action) {
            let count = 0;
            if (action.payload.displayedListCount === 16) {
                count = 4;
            } else {
                if (action.payload.displayedListCount === 8) {
                    count = 2
                } else {
                    if(action.payload.displayedListCount === 5){
                        count = 1
                    }
                }
            }
            console.log(state.filtredMovies.length,state.displayedList.length);
            !state.disabledMoreButton?state.displayedList = [...state.filtredMovies].splice(0, state.displayedList.length + count):console.log('!');

        },
        getDisplayedList(state, action) {
            state.displayedList = ([...state.filtredMovies].splice(0, action.payload.displayedListCount))
        },
        likedToggle(state, action) {
            console.log(action.payload.item, action.payload.parent);
            action.payload.parent === 'movies' ?
                state.savedMovies = [...state.savedMovies.filter(item => item.id !== action.payload.item.id), action.payload.item]
                : state.savedMovies = [...state.savedMovies.filter(item => item.id !== action.payload.item.id)]
        },
        getDisplayedSaveList(state) {
            state.displayedSaveList = [...state.savedMovies]
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
export const { getData, getsavededMovies, handleChange, handleFilter, handleFilterShorts, handlePushMore, getDisplayedList, likedToggle, getDisplayedSaveList, getMoreButtunStatus } = moviesSlice.actions
export default moviesSlice.reducer
