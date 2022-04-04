import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeModal } from '../../store/modules/modal';
import { signUp } from '../../store/modules/user';

const SignUp = () => {
	const dispatch = useDispatch();
	const [inputs, setInputs] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const toSignIn = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(changeModal('signIn'));
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(signUp(inputs));
		alert('이메일이 발송되었습니다. 메일 인증 후 로그인 해주세요.');
		dispatch(changeModal('notSignIn'));
	};

	return (
		<Form onSubmit={onSubmit}>
			<Title>
				반갑습니다, <img src='/images/logofont.png' />
			</Title>
			<Description>계속 하려면 회원가입을 진행해주세요</Description>
			<Label htmlFor='email'>이메일</Label>
			<Input
				type='email'
				id='email'
				name='email'
				placeholder='이메일'
				onChange={onChange}
			/>
			<Label htmlFor='name'>이름</Label>

			<Input
				type='text'
				id='name'
				name='name'
				placeholder='이름'
				onChange={onChange}
			/>
			<Label htmlFor='password'>비밀번호</Label>

			<Input
				type='password'
				id='password'
				name='password'
				placeholder='비밀번호'
				onChange={onChange}
			/>
			<Label htmlFor='confirmPassword'>비밀번호 확인</Label>
			<Input
				type='password'
				id='confirmPassword'
				name='confirmPassword'
				placeholder='비밀번호 확인'
				onChange={onChange}
			/>
			<Button>회원가입</Button>
			<Back onClick={toSignIn} />
		</Form>
	);
};

export default SignUp;

const Form = styled.form`
	width: 480px;
	height: 550px;
	padding: 60px 100px;
`;

const Back = styled.button`
	width: 11px;
	height: 19px;
	background-image: url('/images/back.png');
	background-repeat: no-repeat;
	position: absolute;
	top: 73px;
	left: 73px;
`;

const Title = styled.h2`
	font-size: 22px;
	font-weight: bold;
	margin-bottom: 9px;
`;

const Description = styled.p`
	font-size: 12px;
	margin-bottom: 24px;
`;

const Input = styled.input`
	width: 280px;
	height: 40px;
	border-radius: 7px;
	background-color: ${({ theme }) => theme.colors.base};
	font-size: 12px;
	padding-left: 20px;
	&::placeholder {
		color: ${({ theme }) => theme.colors.sub};
	}
	margin-bottom: 10px;
`;

const Label = styled.label`
	display: block;
	font-size: 12px;
	margin-bottom: 5px;
`;

const Button = styled.button`
	width: 280px;
	height: 40px;
	border-radius: 7px;
	color: ${({ theme }) => theme.colors.buttonTitle};
	font-size: 14px;
	font-weight: 600;
	position: relative;
	transition: 0.2s;
	${({ theme }) => theme.commons.mainButton};
	margin-top: 30px;
`;
