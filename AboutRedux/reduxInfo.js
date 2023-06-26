/* 
 Redux  =  It is a Predictable state container for js Apps and is  single place to store
 
 To use it we have to install 'react-redux' 'redux' 'redux-thunk'
    
             ➡️      APPLICATION    ➡️
           ⬆️                         ⤵️            
          ⬆️                            ⤵️ 
    STORE(DATABASE)      🔁          ACTIONS
         ⬆️                            ⬇️
         ⬆️                           ⬇️
           ⬅️    REDUCERS       ↩️


  1. Application -->  react js and/or node js code (files)

  
  2. Actions --> it is an event that describing somthing that happend 
  in application
  it tells the reducer What to do and how to manipute a state
  
  ex:-
  const exampleAction = 
  {
    type: "PERFORM_TASK",   // type tells to reducer what action supposed to perform next
    payload: 'Learn Redux'  // payload is a data that is going to transfer to reducer
  }

   3. Reducer --> this is responsible for directly manipulating or changing 
  the states of our applications.
  it is a function which takes current_state and Actions as argument
  and return new_State

  4. Store -->  single place to store data , date is globaly available
             Whatever the state of our application
             will be it is going to store inside the redux store.
             And we can fetch the data directly to our application from this store
  */

  /* 

  how to implement in project? ---- and here we go-
   use <Provider> tag in index.js instead of <React.stricMode>

  - intall redux-devtools-extension to use chrome's extension

  first of all make a store.js file--

      createStore = creates store
      combineReduces = combine all reducers used in a app // must to combine all reducer file here
      applyMiddleware = Handler - for this we import redux-thunk (thunk allow us to use nested arrow parameter functions)
   

  Then create reduce.js file
  and then action.js file
  */

  /* 
  use dispatch() within that function which is trying to fetching api from server
     dispatch() -- it takes to the different places
   */