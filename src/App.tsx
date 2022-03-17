import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn';
import ClassHome from './pages/ClassHome';
import ClassRoom from './pages/ClassRoom';
import Main from './pages/Main';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/classroom' element={<ClassRoom />} />
				<Route path='/classhome' element={<ClassHome />} />
			</Routes>
			<SignIn></SignIn>
		</>
	);
};

export default App;
