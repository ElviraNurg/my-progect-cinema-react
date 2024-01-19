import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generatePath } from "react-router-dom";

const BASE_URL = 'http://localhost:3001';
const URL={
    checkToken: '/users/me',
    authorization: '/signin'
}

const AUTHORIZEDHEADERS={
    authorization: `Bearer ${localStorage.getItem('token')}`    
}
/* 
function User(name) {
    this.name = name;
    this.isAdmin = false;
  }
  
  let user = new User("Jack");

function CreateAsyncThunk(funcName, url, headers){
    return createAsyncThunk(
        `${funcName}`,
        async function(_,{rejectWithValue, getState, dispatch}) {
            try{
                const response = await fetch(`${BASE_URL}+${url}`, {
                    headers: {
                        headers
                    }
                })
                if (!response.ok) {
                    throw new Error('Error')
                }
                console.log(response.json());
                return  await response.json();
            }catch(error){
                return rejectWithValue(error.message)
            }
        }
    )
}
export const kkk= new CreateAsyncThunk(kkk,URL.checkToken,AUTHORIZEDHEADERS);
 */

 async function checkRes(response){
    console.log(response);
     if (!response.ok) {
        throw new Error('Error')
    }
    return response.json()
} 

 export const checkToken = createAsyncThunk(
    'checkToken',
    async function (_, { rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            return response.json()
            //dispatch(checkRes(response))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });
    
export const authorization = createAsyncThunk(
    'authorization',
    async function (_, { rejectWithValue, getState, dispatch }) {
        const valueReg = getState().datas.datas.valueReg;
        try {
            const response = await fetch(`${BASE_URL}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: valueReg.email,
                    password: valueReg.password,
                })
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            dispatch(checkToken())
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });
export const registration = createAsyncThunk(
    'registration',
    async function (_, { rejectWithValue, getState, dispatch }) {
        const valueReg = getState().datas.datas.valueReg;
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: valueReg.name,
                    email: valueReg.email,
                    password: valueReg.password,
                })
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            dispatch(authorization());
            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message)
        }

    })

export const saveChange = createAsyncThunk(
    'SaveChange',
    async function (_, { rejectWithValue, getState }) {
        const inputErr = getState().datas.datas.inputErr;
       
        const valueUser = inputErr.nameErr === '' && inputErr.emailErr === '' ?
            getState().datas.datas.valueReg : getState().datas.datas.valueUser;
        
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: valueUser.name,
                    email: valueUser.email,
                })
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            const userInfo = await response.json();
            return userInfo;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

export const saveMovie = createAsyncThunk(
    'saveMovie',
    async function (action, { rejectWithValue }) {
        
        const parent = action.parent;
        const item = action.item;
        //console.log('item', item.owner);
        const id = parent === 'movies' ? item.id : item.movieId
        try {
            const response = await fetch(`${BASE_URL}/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    country: item.country,
                    director: item.director,
                    duration: item.duration,
                    year: item.year,
                    description: item.description,
                    image: `https://api.nomoreparties.co/${item.image.url}`,
                    trailerLink: item.trailerLink,
                    nameRU: item.nameRU,
                    nameEN: item.nameEN,
                    thumbnail: `https://api.nomoreparties.co/${item.thumbnail}`,
                    movieId: id,
                    owner: item.owner,
                })
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            const userInfo = await response.json();

            return userInfo;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })


export const deleteMovie = createAsyncThunk(
    'deleteMovie',
    async function (action, { rejectWithValue, getState }) {   
        const savedMovies = getState().datas.datas.savedMovies
        const item = action.item;
        const id = savedMovies.find(saved => saved.movieId === item.id||saved.movieId===item.movieId)?._id

        try {
            const response = await fetch(`${BASE_URL}/movies/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    movieId: item._id,
                })
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            const userInfo = await response.json();
            console.log(userInfo);
            return userInfo;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    })

    export const getSavedMovies = createAsyncThunk(
        'getSavedMovies',
        async function (action, { rejectWithValue, getState }) {
            try {
                const response = await fetch(`${BASE_URL}/movies`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    
                })
                if (!response.ok) {
                    throw new Error('Error')
                }
                return await response.json();
            } catch (error) {
                return rejectWithValue(error.message)
            }
        })

const dataSlice = createSlice({
    name: 'datas',
    initialState: {
        datas: [],
        error: null,
        isLoading: false,
        authorizedUser: false,
        userToken: '',
        clickedToggle: false,//Используется в header
        clicker: 'enter',

        searchValue: JSON.parse(localStorage.getItem('search')) || '',
        searchValueInSave: '',
        filtredMovies: JSON.parse(localStorage.getItem('filtredMovies')) || [],
        savedMovies: JSON.parse(localStorage.getItem('savedMovies')) || [],//сохраненные фильмы
        displayedList: [],//список отображаемых фильмов
        liked: null, //лайкнут фильм или нет
        displayedSaveList: [],//список отображаемых фильмов сохраненных
        disabledMoreButton: false,//кнопка еще активная или нет

        valueReg: {
            name: '',
            email: '',
            password: '',
        },//данные при регистрации
        valueUser: {},
        inputErr: {
            nameErr: '',
            emailErr: '',
            passwordErr: ''
        },//ошибки в введенных данных
        isValid: false,

        //clickedFilter: false,
        clickedEdit: false,
        saveButtonStatus: false,//состояние кнопки сохранить при изменении данных пользователя
        verification: {},//промежуточная переменная для проверки значений
    },
    reducers: {
        onClickToggle(state, action) {
            state.clickedToggle = !state.clickedToggle
        },
        onClickFalse(state, action) {
            state.clickedToggle = false
        },

        onClickEnter(state, action) {
            state.clicker = 'enter';
        },
        clickEdit(state) {
            state.clickedEdit = !state.clickedEdit
        },
        onClickRegistration(state, action) {
            state.clicker = 'registration';
        },
        handleChange(state, action) {
            console.log('parent', action.payload.parent);
            action.payload.parent === 'movies' ?
                state.searchValue = action.payload.e.target.value
                : state.searchValueInSave = action.payload.e.target.value

            console.log('state.searchValue ', state.searchValue, 'state.searchValueInSave ', state.searchValueInSave);
        },
        //Фильтр по названию фильма
        handleFilter(state, action) {

            let clickedShorts = action.payload.clickedShorts ? action.payload.clickedShorts : action.payload.clickedShortsInSave;

            let movies = JSON.parse(localStorage.getItem('movies')) ? JSON.parse(localStorage.getItem('movies')) : action.payload.movies;
            let value = action.payload.parent === 'movies' ? state.searchValue : state.searchValueInSave;
            const moviesType = action.payload.parent === 'movies' ? movies : state.savedMovies;

            // console.log('moviesType =>', moviesType);
            // console.log('searchValue=>', value);
            if (value === '') {
                state.filtredMovies = moviesType
            }
            if (value.length !== 0 && value !== '') {
                state.filtredMovies = moviesType.filter((item) => item.nameRU.toLowerCase().includes(state.searchValue.toLowerCase()) || item.nameEN.toLowerCase().includes(state.searchValue.toLowerCase()))
            }
            if (value.length !== 0 && clickedShorts) {
                state.filtredMovies = moviesType.filter((item) => (item.nameRU.toLowerCase().includes(state.searchValue.toLowerCase()) && item.duration < 40) || (item.nameEN.toLowerCase().includes(state.searchValue.toLowerCase()) && item.duration < 40))
            }
            if (value.length === 0 && clickedShorts) {
                state.filtredMovies = moviesType.filter((item) => item.duration < 40);
            }
            localStorage.setItem('filtredMovies', JSON.stringify(state.filtredMovies));
        },
        getMoreButtunStatus(state) {

            if (state.filtredMovies.length - state.displayedList.length <= 0) {
                state.disabledMoreButton = true
            } else {
                state.disabledMoreButton = false
            }
        },
        handlePushMore(state, action) {
            let count = 0;
            if (action.payload.displayedListCount === 16) {
                count = 4;
            } else {
                if (action.payload.displayedListCount === 8) {
                    count = 2
                } else {
                    if (action.payload.displayedListCount === 5) {
                        count = 2
                    }
                }
            }
            //console.log(state.filtredMovies.length, state.displayedList.length);
            !state.disabledMoreButton ? state.displayedList = [...state.filtredMovies].splice(0, state.displayedList.length + count) : console.log('!');

        },
        getDisplayedList(state, action) {
            const filtredMovies = JSON.parse(localStorage.getItem('filtredMoviesLocal'))
            filtredMovies ? state.displayedList = ([...filtredMovies].splice(0, action.payload.displayedListCount))
                : state.displayedList = ([...state.filtredMovies].splice(0, action.payload.displayedListCount))
        },
        handleClickExit(state, action) {
            localStorage.clear();
            //{...state}={...initialState};   ????
            state.authorizedUser = false;
            state.savedMovies = [];
            state.movies = [];
            state.filtredMovies=[];
            console.log('state.filtredMovies ', state.filtredMovies);
            state.clicker='enter';
        },
        getDisplayedSaveList(state, action) {
            !action.payload.clickedShortsInSave ?
                state.displayedSaveList = [...state.savedMovies.filter(item => item.nameRU.toLowerCase().includes(state.searchValueInSave.toLowerCase()) || item.nameEN.toLowerCase().includes(state.searchValueInSave.toLowerCase()))]
                : state.displayedSaveList = [...state.savedMovies.filter(item => (item.nameRU.toLowerCase().includes(state.searchValueInSave.toLowerCase()) && item.duration < 40) || (item.nameEN.toLowerCase().includes(state.searchValueInSave.toLowerCase()) && item.duration < 40))]
        },

        validateReg(state, action) {

            if (!(/^([а-яё\s]+|[a-z\s]+)$/iu).test(state.valueReg.name) || state.valueReg.name.length < 3 || state.valueReg.name.length > 30) {
                state.inputErr.nameErr = "Please enter your name.";
            } else {

                state.inputErr.nameErr = '';
            }
            if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(state.valueReg.email)) {

                state.inputErr.emailErr = "Please enter valid email address.";
            } else {

                state.inputErr.emailErr = '';
            }
        },
        handleChangeReg(state, action) {
            state.valueReg = action.payload.e.target.name === 'nameUser' ? { ...state.valueReg, ['name']: action.payload.e.target.value } : { ...state.valueReg, [action.payload.e.target.name]: action.payload.e.target.value };
        },
        handleChangeValue(state, action) {
            state.valueReg = { ...state.valueReg, [action.payload.e.target.name]: action.payload.e.target.value };
        },

    },
    extraReducers: {
        [authorization.pending]: (state) => {
            state.isLoading = true;
        },
        [authorization.fulfilled]: (state, action) => {
            state.isLoading = false;
            localStorage.setItem('token', action.payload.token);
            
        },
        [authorization.rejected]: (state, action) => {
            state.error = action.payload;
        },

        [registration.pending]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userToken = action.payload;
            checkToken()
            state.authorizedUser = true;
        },
        [registration.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [checkToken.fulfilled]: (state, action) => {

            state.valueReg = { ...action.payload };
            state.valueUser = { ...action.payload };
            state.authorizedUser = true;
          
        },
        [checkToken.rejected]: (state, action) => {
            console.log(action.payload);
            state.authorizedUser = false;

        },
        [saveChange.fulfilled]: (state, action) => {
            alert("Запрос выполнен успешно")
            state.valueUser = { ...action.payload.data };
            state.clickedEdit = !state.clickedEdit
        },
        [saveMovie.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.savedMovies.push(action.payload)
        },
        [saveMovie.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [deleteMovie.fulfilled]: (state, action) => {
            console.log('action.payload ', action.payload);

            state.savedMovies = [...state.savedMovies.filter(item => item.movieId !== action.payload.movieId)]
        },
        [getSavedMovies.fulfilled]: (state, action) => {
            console.log('action.payload.data ', action.payload.data);

            state.savedMovies = action.payload.data
        },
    }
})
export const { onClickToggle, onClickFalse, onClickEnter, onClickRegistration, clickEdit, handleChange, handleFilter, handleFilterShorts, handlePushMore, getDisplayedList, likedToggle, getDisplayedSaveList, getMoreButtunStatus, handleChangeReg, validateReg, clickSave, handleChangeValue, handleClickExit } = dataSlice.actions;
export default dataSlice.reducer