// import React from 'react';

// function SearchPokemon(props) {
//   //check for empty search
//   const checkErrors = (errorObject) => {
//     if (Object.keys(props.errors).length === 0) {
//       return false;
//     }
//   //if not empty
//     return true;
//   };

//   const onSubmit = () => {
//     //relating to error function up top
//     if (checkErrors(props.errors)) {
//       props.getPokeByNameOrId(props.pokemon);
//     }
//   };

//   return (
//     <div className="header">
//       <h1 className="app-title" onClick={() => props.onHomepage()}>Pokedex</h1>

//         <div className="searchbar-container">
//           <input
//             type="text"
//             placeholder="Search Pokemon"
//             name="searchbar"
//             value={props.pokemon}
//             onChange={}
//           />
//           <button id="searchbutton" onClick={() => onSubmit()}>Go!</button>
//         </div>
        
//         {props.errors?.searchbar?.length ? (
//         <div>{props.errors.searchbar}</div>
//       ) : null}
//     </div>
//   );
// }

// export default SearchPokemon;