import styled from 'styled-components';

export const App = styled.div`
	font-family: sans-serif;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 20px;
	height: 100vh;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

export const TextInput = styled.input`
	height: 25px;
	border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const SubmitInput = styled.input`
	margin-top: 10px;
	cursor: pointer;
	font-size: 15px;
	background: #3882f6;
	border: 1px solid #3882f6;
	color: #fff;
	padding: 10px 20px;

	:hover {
		color: #3882f6;
		background: #e5e7eb;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const LoginForm = styled.div`
	background: linear-gradient(145deg, #1a232f, #242f3f);
	color: white;
	padding: 2rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const ListContainer = styled.div`
	display: flex;
`;

export const Title = styled.div`
	font-size: 25px;
	margin-bottom: 20px;
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin: 10px;
`;

export const Error = styled.div`
	color: red;
`;

export const SignUp = styled.div`
	text-decoration: none;
	padding-top: 5px;
	color: Blue;
`;
