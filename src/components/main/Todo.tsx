import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '../../store/configStore';
import {
	addTodo,
	deleteTodo,
	loadTodos,
	toggleComplete,
} from '../../store/modules/todo';
import closeButton from '../../assets/closeButton.png';

const Todo = () => {
	const dispatch = useDispatch();
	const [isInput, setIsInput] = useState(false);
	const [input, setInput] = useState('');
	const todos = useSelector((state: RootState) => state.todo);
	useEffect(() => {
		dispatch(loadTodos());
	}, []);
	const add = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addTodo(input));
		setIsInput(false);
	};
	const focusOut = () => {
		setIsInput(false);
	};
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};
	return (
		<Container>
			<Title>해야 할 일</Title>
			<ScheduleBox>
				{todos.map(
					(todo: { id: string; content: string; isComplete: boolean }) => (
						<TodoItem key={todo.id} {...todo} />
					)
				)}
				<Form onSubmit={add}>
					{isInput ? (
						<InputBox
							type='text'
							onBlur={focusOut}
							autoFocus
							onChange={onChange}
						/>
					) : (
						<AddButton
							onClick={() => {
								setIsInput(true);
							}}
						>
							+
						</AddButton>
					)}
				</Form>
			</ScheduleBox>
		</Container>
	);
};

export default Todo;

interface TodoItemProps {
	id: string;
	content: string;
	isComplete: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, content, isComplete }) => {
	const dispatch = useDispatch();
	const deleteto = async () => {
		dispatch(deleteTodo(id));
	};
	const toggle = async () => {
		dispatch(toggleComplete(id));
	};

	return (
		<ScheduleItem isComplete={isComplete} onClick={toggle}>
			{content}
			<CloseButton onClick={deleteto} src={closeButton} />
		</ScheduleItem>
	);
};

const Container = styled.div`
	/* 사이즈 */
	width: 290px;
	height: 320px;
`;

const Title = styled.h2`
	font-size: 20px;
	margin-bottom: 10px;
`;

const ScheduleBox = styled.ul`
	/* 사이즈 */
	width: 290px;
	height: 285px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 5px; /*스크롤바의 너비*/
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ccc; /*스크롤바의 색상*/
		border-radius: 10px;
	}

`;

interface ScheduleItemProps {
	isComplete: boolean;
}

const ScheduleItem = styled.li<ScheduleItemProps>`
	/* 사이즈 */
	width: 270px;
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 7px;
	background-color: ${props => props.theme.colors.main};
	margin: 0 auto;
	margin-bottom: 23px;
	color: #fff;
	position: relative;
	font-weight: 700;
	font-size: 14px;
	${(props) =>
		props.isComplete &&
		css`
			color: #b7b7b7;
			background-color: #fff;
			text-decoration: line-through;
		`};
	padding: 20px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
	transition: 0.1s;
	&:hover {
		transform: scale(1.025);
	}
	cursor: pointer;
`;

const CloseButton = styled.img`
	position: absolute;
	top: 15px;
	right: 15px;
	cursor: pointer;
`;

const AddButton = styled.button`
	display: block;
	width: 270px;
	height: 80px;
	background: none;
	border: none;
	border-radius: 7px;
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
	color: #718aff;
	font-size: 30px;
	margin-bottom: 10px;
	transition: 0.1s;
	&:hover {
		transform: scale(1.025);
	}
`;

const InputBox = styled.input`
	display: block;
	width: 270px;
	height: 80px;
	border-radius: 7px;
	background-color: #718aff;
	border: none;
	color: #fff;
	text-align: center;
	font-weight: 700;
	font-size: 14px;
	outline: none;
	margin: 0 auto;
	margin-bottom: 23px;
	box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form``;