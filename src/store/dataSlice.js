import { createSlice } from "@reduxjs/toolkit";
const dataSlice=createSlice({
    name:'datas',
    initialState: {
        datas:[],
        error:null,
        isLoading:false,
        authorizedUser: true,
        clickedToggle: false,
        clicker: '',
        
    },
    reducers:{
        onClickToggle(state, action){
            state.clickedToggle = !state.clickedToggle
        },
        onClickFalse(state, action){
            state.clickedToggle = false
        },

        onClickEnter(state, action){
            state.clicker = 'enter';
            console.log(state.clicker);
        },
        onClickRegistration(state, action){
            state.clicker = 'registration';
            console.log('reg');   
        },
        
        
    },
})
export const {onClickToggle,onClickFalse, onClickEnter, onClickRegistration, }=dataSlice.actions;
export default dataSlice.reducer