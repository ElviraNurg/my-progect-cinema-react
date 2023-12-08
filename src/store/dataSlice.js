import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
    name: 'datas',
    initialState: {
        datas: [],
        error: null,
        isLoading: false,
        authorizedUser: true,
        clickedToggle: false,//Используется в header
        clicker: '',

        searchValue: '',
        filtredMovies: [],
        savedMovies: [],//сохраненные фильмы
        displayedList: [],//список отображаемых фильмов
        liked: null, //лайкнут фильм или нет
        displayedSaveList: [],//список отображаемых фильмов сохраненных
        disabledMoreButton: false,//кнопка еще активная или нет

        valueReg: {
            username: '',
            email: '',
            password: '',
        },//данные при регистрации
        inputErr: {
            nameErr: '',
            emailErr: '',
            passwordErr: ''
        },//ошибки в введенных данных
        isValid: true,
        
        clickedFilter: false,
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
            console.log(state.clicker);
        },
        onClickRegistration(state, action) {
            state.clicker = 'registration';
        },
        handleChange(state, action) {
            state.searchValue = action.payload.e.target.value;
        },
        //Фильтр по названию фильма
        handleFilter(state, action) {
            if (state.searchValue.length !== 0) {
                state.filtredMovies = action.payload.movies.filter((item) => item.nameRU.toLowerCase().includes(state.searchValue.toLowerCase())  || item.nameEN.toLowerCase().includes(state.searchValue.toLowerCase()))
            }
            if(state.searchValue.length !== 0&&action.payload.clickedShorts){
                console.log('!!!');
                state.filtredMovies = action.payload.movies.filter((item) => (item.nameRU.toLowerCase().includes(state.searchValue.toLowerCase())&&item.duration<40 ) || (item.nameEN.toLowerCase().includes(state.searchValue.toLowerCase())&&item.duration<40))
            }
            if(state.searchValue.length === 0&&action.payload.clickedShorts){
                state.filtredMovies = action.payload.movies.filter((item) => item.duration < 40);
            }
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
                        count = 1
                    }
                }
            }
            //console.log(state.filtredMovies.length, state.displayedList.length);
            !state.disabledMoreButton ? state.displayedList = [...state.filtredMovies].splice(0, state.displayedList.length + count) : console.log('!');

        },
        getDisplayedList(state, action) {
            state.displayedList = ([...state.filtredMovies].splice(0, action.payload.displayedListCount))
        },
        likedToggle(state, action) {
           // console.log(action.payload.item, action.payload.parent);
            action.payload.parent === 'movies' ?
                state.savedMovies = [...state.savedMovies.filter(item => item.id !== action.payload.item.id), action.payload.item]
                : state.savedMovies = [...state.savedMovies.filter(item => item.id !== action.payload.item.id)]
            //console.log(state.savedMovies);
        },
        getDisplayedSaveList(state,action) {
          !action.payload.clickedShorts?
            state.displayedSaveList=[...state.savedMovies.filter(item => item.nameRU.toLowerCase().includes(state.searchValue.toLowerCase())  || item.nameEN.toLowerCase().includes(state.searchValue.toLowerCase()))]
            :state.displayedSaveList=[...state.savedMovies.filter(item => item.nameRU.toLowerCase().includes(state.searchValue.toLowerCase())&&item.duration<40  || item.nameEN.toLowerCase().includes(state.searchValue.toLowerCase())&&item.duration<40)]
        },
        handleClickReg(state, action) {
            fetch('https://api.sysoev.nomoreparties.co/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: state.valueReg.username,
                    email: state.valueReg.email,
                    password: state.valueReg.password,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('response ==> ', response.json());
                        return response.json();
                    }
                    // throw new Error(`${response.status} ${response.statusText}`)
                })
            /*  console.log('action.payload',action.payload);
             fetch(`https://api.sysoev.nomoreparties.co/singup`, {
                 method: 'POST',
                 headers: {
                     'Content-type': 'application/json',
                 },
                 body: JSON.stringify({
                     "name": state.valueReg.username,
                     "email": state.valueReg.email,
                     "password": state.valueReg.password,
                 }),
             }) */
            // .then((response) => {
            //     if (response.ok) {
            //         return response.json();
            //     }
            //     // throw new Error(`${response.status} ${response.statusText}`)
            // })
            // .catch(error => {
            //     console.log('err', error);
            //     state.error = error;
            // })

            state.valueReg = {
                username: '',
                email: '',
                password: '',
            };
        },
        handleClickEnter(state, action) {
            fetch(`https://api.sysoev.nomoreparties.co/singup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    ...action.payload.item,
                    "name": state.valueReg.name,
                    "email": state.valueReg.email,
                    "password": state.valueReg.password,
                }
                ),
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`${response.status} ${response.statusText}`)
            }).catch(error => {
                console.log('err', error);
                state.error = error;
            })
            console.log('action.payload.item', action.payload.item);
            state.valueReg = null;
        },
        validateReg(state, action) {
            if (!(/^([а-яё\s]+|[a-z\s]+)$/iu).test(state.valueReg.username) || state.valueReg.username.length < 3 || state.valueReg.username.length > 30) {
                state.isValid = false;
                state.inputErr.nameErr = "Please enter your name.";
            } else {
                state.isValid = true;
                state.inputErr.nameErr = '';
            }
            if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(state.valueReg.email)) {
                state.isValid = false;
                state.inputErr.emailErr = "Please enter valid email address.";
            } else {
                state.isValid = true;
                state.inputErr.emailErr = '';
            }

        },
        handleChangeReg(state, action) {
            state.valueReg = { ...state.valueReg, [action.payload.e.target.name]: action.payload.e.target.value };
        },

    }
})
export const { onClickToggle, onClickFalse, onClickEnter, onClickRegistration, getsavededMovies, handleChange, handleFilter, handleFilterShorts, handlePushMore, getDisplayedList, likedToggle, getDisplayedSaveList, getMoreButtunStatus, handleClickReg, handleChangeReg, handleClickEnter, validateReg } = dataSlice.actions;
export default dataSlice.reducer