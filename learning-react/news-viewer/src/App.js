//import React, { useState } from 'react';
// const App = () => {
//   const [data, setData] = useState(null);
//   const onClikc = async () => {
//     try {
//       const respones = await axios.get(
//         'https://newsapi.org/v2/top-headlines?country=kr&apiKey=5b223d10598d4bac96f504a56c024b87',
//       );
//       setData(respones.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div>
//       <div>
//         <button onClick={onClikc}>불러오기</button>
//       </div>
//       {data && (
//         <textarea
//           row={'7'}
//           value={JSON.stringify(data, null, 2)}
//           readOnly={true}
//         ></textarea>
//       )}
//     </div>
//   );
// };

//import React, {useState, useCallback} from 'react';
//import { Route } from 'react-router-dom';
//import NewsPage from './pages/NewsPage';
//import NewsList from './components/NewsList';
//import Categories from './components/Categories';
import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return <Route path="/:category?" component={NewsPage}/>
  // <>
  // <Categories category={category} onSelect={onSelect}/>
  // <NewsList category={category}/>
  // </>
};

export default App;


//5b223d10598d4bac96f504a56c024b87