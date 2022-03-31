import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import apis from '../../api';
import { updateBoard, postBoard } from '../../store/modules/user';

const WritePost = () => {
	const navigate = useNavigate();
	const [state, setState] = useState({
		title: '',
		content: '',
		postType: 'Question',
	});
	const { updateid, classid, postid } = useParams<string>();
	const dispatch = useDispatch();

	const loadPost = async () => {
		if (updateid) {
			try {
				const response = await apis.loadPage(updateid);
				const title = response.data.post.title;
				const content = response.data.post.content;
				const postType = response.data.post.postType;
				setState({ title, content, postType });
			} catch (error) {
				console.log(error);
			}
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const onUpdate = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const boardInfo = state;
		if (updateid) {
			console.log(state);
			dispatch(updateBoard({ boardInfo, updateid }));
			alert('수정완료');
			navigate(`/classhome/${classid}/post/${postid}`);
		}
	};

	const onPost = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const boardInfo = state;
		console.log(boardInfo);
		if (classid) {
			console.log(state);
			dispatch(postBoard({ boardInfo, classid }));
			alert('저장완료');
			navigate(`/classhome/${classid}/1`);
		}
	};

	const onBack = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		navigate(-1);
	};

	useEffect(() => {
		loadPost();
	}, []);

	return updateid ? (
		<Container>
			<h1>수정하기</h1>
			<TitleInput onChange={onChange} name='title' value={state.title} />
			<ContentInput onChange={onChange} name='content' value={state.content} />
			<Button onClick={onBack}>작성취소</Button>
			<ReturnButton onClick={onUpdate}>저장하기</ReturnButton>
		</Container>
	) : (
		<Container>
			<h1>새 글 작성</h1>
			<TitleInput onChange={onChange} name='title' value={state.title} />
			<ContentInput onChange={onChange} name='content' value={state.content} />
			<ReturnButton onClick={onBack}>작성취소</ReturnButton>
			<Button onClick={onPost}>저장하기</Button>
		</Container>
	);
};

export default WritePost;

const Container = styled.div`
	width: 890px;
	height: 850px;
	background-color: ${({ theme }) => theme.colors.background};
	border-radius: 10px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
	position: relative;
	padding: 50px;
`;

const TitleInput = styled.input`
	resize: none;
	border: none;
	margin-top: 20px;
	width: 100%;
	height: 50px;
	border-radius: 10px;
	outline: none;
	transition: 0.2s;
	padding: 25px;
	font-size: ${({ theme }) => theme.fontSizes.base};
	background-color: ${({ theme }) => theme.colors.base};
`;

const ContentInput = styled.textarea`
	resize: none;
	border: none;
	margin-top: 40px;
	width: 100%;
	height: 562px;
	border-radius: 10px;
	outline: none;
	transition: 0.2s;
	padding: 25px;
	font-size: ${({ theme }) => theme.fontSizes.base};
	background-color: ${({ theme }) => theme.colors.base};
	&::-webkit-scrollbar {
		width: 15px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.colors.scroll};
		border-radius: 10px;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: ${({ theme }) => theme.colors.scrollHover};
	}
`;

const ReturnButton = styled.button`
	width: 80px;
	height: 30px;
	border-radius: 7px;
	background-color: ${({ theme }) => theme.colors.base};
	color: ${({ theme }) => theme.colors.blueTitle};
	border: none;
	right: 150px;
	bottom: 25px;
	cursor: pointer;
	position: absolute;
`;

const Button = styled.button`
	width: 80px;
	height: 30px;
	border-radius: 7px;
	background-color: ${({ theme }) => theme.colors.main};
	color: ${({ theme }) => theme.colors.buttonTitle};
	border: none;
	right: 50px;
	bottom: 25px;
	cursor: pointer;
	position: absolute;
`;