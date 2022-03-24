import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import apis from '../../api';
import star from '../../assets/star.png';
import dot from '../../assets/dot.png';

const Board = () => {
	const navigate = useNavigate();
	const { classid, page } = useParams();
	const [notice, setNotice] =
		useState<
			{ id: number; title: string; writer: string; createdAt: string }[]
		>();
	const [question, setQuestion] =
		useState<
			{ id: number; title: string; writer: string; createdAt: string }[]
		>();

	const [pages, setPages] = useState<{ page: number; selected: boolean }[]>([]);

	const fetch = async () => {
		const response = await apis.loadClassBoards(`${classid}?page=${page}` as string);
		setNotice(response.data.boardListNotice);
		setQuestion(response.data.boardListquestion);
		const newPages = [];
		for (let i = 1; i <= response.data.pages; i++) {
			newPages.push({ page: i, selected: false });
		}
		newPages[0].selected = true
		setPages(newPages);
		console.log(response.data);
	};
	useEffect(() => {
		fetch();
	}, [page]);

	useEffect(() => {
		console.log(question);
	}, [question]);

	return (
		<Container>
			<Title>수강생 게시판</Title>
			<Table>
				<thead>
					<tr>
						<Th />
						<Th>구분</Th>
						<Th>글제목</Th>
						<Th>작성자</Th>
						<Th>작성일</Th>
					</tr>
				</thead>
				<tbody>
					{notice &&
						notice.map((row) => (
							<tr key={row.id}>
								<td>
									<img src={star} />
								</td>
								<td>공지</td>
								<td
									onClick={() => {
										navigate(`/classhome/${classid}/${row.id}`);
									}}
								>
									{row.title}
								</td>
								<td>{row.writer}</td>
								<td>{row.createdAt.split('T')[0]}</td>
							</tr>
						))}
					{question &&
						question.map((row) => (
							<tr key={row.id}>
								<td>
									<img src={dot} />
								</td>
								<td>질문</td>
								<td
									onClick={() => {
										navigate(`/classhome/${classid}/${row.id}`);
									}}
								>
									{row.title}
								</td>
								<td>{row.writer}</td>
								<td>{row.createdAt.split('T')[0]}</td>
							</tr>
						))}
				</tbody>
			</Table>
			<Pagenation>
				{pages.map((page) => (
					<Page key={page.page} selected={page.selected} onClick={() => {navigate(`/classhome/${classid}/${page.page}`)}}>
						{page.page}
					</Page>
				))}
			</Pagenation>
			<AddButton>+</AddButton>
		</Container>
	);
};

export default Board;

const Container = styled.div`
	width: 890px;
	height: 850px;
	background-color: #fff;
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
	position: relative;
`;

const Title = styled.h2`
	padding: 10px;
	font-size: 30px;
	font-weight: 700;
	border-bottom: 3px solid rgba(83, 112, 245, 0.3);
`;

const Table = styled.table`
	padding: 30px;
	width: 840px;
	margin: 0 auto;
`;

const Th = styled.th`
	text-align: left;
`;

const Pagenation = styled.div`
	position: absolute;
	bottom: 50px;
	right: 50%;
	transform: translateX(50%);
`;

const AddButton = styled.button`
	position: absolute;
	bottom: 50px;
	right: 50px;
	width: 54px;
	height: 54px;
	line-height: 54px;
	font-size: 40px;
	font-weight: 800;
	border-radius: 27px;
	border: none;
	background-color: #718aff;
	color: #fff;
`;

interface PageProps {
	selected: boolean;
}

const Page = styled.button<PageProps>`
	border: none;
	background: none;
	margin: 0 8px;
	${(props) => props.selected? 'color: #5370f5; font-weight: 700;': ''}
`;