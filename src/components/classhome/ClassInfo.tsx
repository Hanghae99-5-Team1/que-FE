import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import apis from '../../api';

const ClassInfo: React.FC = () => {
	const { classid } = useParams();
	console.log(classid);
	const [students, setStudents] = useState<{ name: string }[]>();
	const [data, setData] = useState<{
		title: string;
		teacher: string;
		time: string;
		imageUrl: string;
	}>();
	const fetch = async () => {
		const response = await apis.loadClassInfo(classid as string);
		const response2 = await apis.loadStudents(classid as string);
		setData(response.data);
		setStudents(response2.data);
		console.log(response.data);
		console.log(response2.data);
	};
	useEffect(() => {
		fetch();
	}, []);
	return (
		<Container>
			<Image src={data && data.imageUrl} />
			<Button src='/images/play.png' />
			<Title>{data && data.title}</Title>
			<Teacher>{data && data.teacher} 선생님</Teacher>
			<Time>{data && data.time}</Time>
			{/* {students && students.map((student: any, index: number) => <li key={index}>{student.username} {student.state}</li>)} */}
		</Container>
	);
};

export default ClassInfo;

const Container = styled.div`
	/* 사이즈 */
	width: 280px;
	height: 540px;
	border-radius: 10px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
	/* 임시 스타일 코드 */
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	position: relative;
`;

const Image = styled.img`
	width: 230px;
	height: 155px;
	border-radius: 7px;
	object-fit: cover;
`;

const Title = styled.h2`
	font-size: 18px;
	color: ${({ theme }) => theme.colors.title};
`;

const Teacher = styled.p`
	margin-top: 10px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.title};
`;

const Time = styled.p`
	margin-top: 10px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.subTitle};
`;

const Button = styled.img`
	position: absolute;
	top: 120px;
	right: 40px;
`;
