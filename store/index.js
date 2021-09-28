export const strict = false;

export const state = () => ({
  snackText : '',
  snackBar : false,

});

export const mutations = {
  openSnack( state, text ){
    state.snackText = text;
    state.snackBar = true;
    setTimeout(() => {
      state.snackBar = false;
    }, 5000);
  }
};
