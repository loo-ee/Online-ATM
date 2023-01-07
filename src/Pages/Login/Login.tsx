import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUser,
  getLinkedAccounts,
  getUser,
  login,
  searchUserEmail,
  validateSession,
} from '../../adapter/userAdapter';
import { SystemContext } from '../../contexts/SystemContext';
import { UserContext } from '../../contexts/UserContext';
import { baseUrl } from '../../util/systemConfig';

interface Prop {}

const Login: React.FC<Prop> = ({}) => {
  const User = useContext(UserContext);
  const System = useContext(SystemContext);
  const [headerText, setHeaderText] = useState('Login');
  const [authMode, setAuthMode] = useState('login');
  const navigator = useNavigate();

  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const usernameRegister = useRef<HTMLInputElement>(null);
  const emailRegister = useRef<HTMLInputElement>(null);
  const pass1Register = useRef<HTMLInputElement>(null);
  const pass2Register = useRef<HTMLInputElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);
  const registerBtn = useRef<HTMLButtonElement>(null);

  const checkPreviousSession = async () => {
    const authenticatedUser = await validateSession();

    if (authenticatedUser) {
      const linkedAccounts = await getLinkedAccounts(authenticatedUser.email);

      User!.setUser({
        ...authenticatedUser,
        accounts: linkedAccounts,
      });
    }
  };

  useEffect(() => {
    checkPreviousSession();
    console.log(User?.user);

    if (User?.user.username != '???') {
      if (User?.user.isAdmin) {
        navigator(baseUrl + 'admin/account-creation/');
        return;
      }
      navigator(baseUrl + 'feed/');
      console.log(User!.user.accounts);
    }
  }, [User?.user.accounts]);

  setTimeout(() => {
    loginBtn.current?.addEventListener('click', async (e) => {
      e.preventDefault();

      if (!validateLoginInputs()) return;

      const emailInput = emailField.current!.value;
      const passwordInput = passwordField.current!.value;
      const user = await login(emailInput, passwordInput);

      if (!user) {
        emailField.current!.value = '';
        passwordField.current!.value = '';

        setHeaderText('Account not found!');
        resetHeader('Login');
        return;
      }

      const linkedAccounts = await getLinkedAccounts(emailInput);

      User?.setUser({
        ...user,
        accounts: linkedAccounts,
      });

      if (user.isAdmin) navigator(baseUrl + 'admin/account-creation/');
      else navigator(baseUrl + 'feed/');
    });

    registerBtn.current?.addEventListener('click', async (e) => {
      e.preventDefault();

      if (!validateRegisterInputs()) return;

      const usernameInput = usernameRegister.current!.value;
      const emailInput = emailRegister.current!.value;
      const password1Input = pass1Register.current!.value;
      const password2Input = pass2Register.current!.value;

      if (await searchEmail(emailInput)) {
        setHeaderText('This email is already used!');
        emailRegister.current!.value = '';
        resetHeader('Register');
        return;
      }

      if (password1Input != password2Input) {
        setHeaderText("Passwords don't match!");
        resetHeader('Register');
        return true;
      }

      await createUser({
        username: usernameInput,
        email: emailInput,
        avatar: null,
        password: password1Input,
        last_login: null,
        isAdmin: false,
      });

      usernameRegister.current!.value = '';
      emailRegister.current!.value = '';
      pass1Register.current!.value = '';
      pass2Register.current!.value = '';
    });
  });

  const resetHeader = (text: string) => {
    setTimeout(() => {
      setHeaderText(text);
    }, 5000);
  };

  const searchEmail = async (email: string) => {
    return await searchUserEmail(email);
  };

  const searchUser = async (email: string, password: string) => {
    return await getUser(email, password);
  };

  const validateLoginInputs = (): boolean => {
    if (emailField.current!.value == '' || passwordField.current!.value == '') {
      return false;
    }

    return true;
  };

  const validateRegisterInputs = (): boolean => {
    if (
      usernameRegister.current!.value == '' ||
      emailRegister.current!.value == '' ||
      pass1Register.current!.value == '' ||
      pass2Register.current!.value == ''
    ) {
      setHeaderText('Please complete the form');
      resetHeader('Register');
      return false;
    }

    return true;
  };

  if (authMode == 'login') {
    return (
      <div className="flex flex-col items-center border-2 rounded-lg w-[500px] p-4">
        <div>{headerText}</div>

        <div>
          <form action="" className="flex flex-col items-center">
            <input
              ref={emailField}
              type="text"
              id="email"
              placeholder="Enter email"
              className="border-2 border-black rounded p-2 my-3"
            />

            <input
              ref={passwordField}
              type="password"
              id="password"
              placeholder="Enter password"
              className="border-2 border-black rounded p-2 my-3"
            />

            <button
              ref={loginBtn}
              className="border-2 border-black rounded-lg p-2 w-32 mt-2"
            >
              Login
            </button>
          </form>
        </div>

        <div className="flex flex-col p-3 mt-4 items-center">
          <span>Haven't registered yet?</span>
          <button
            onClick={() => {
              setHeaderText('Register');
              setAuthMode('register');
            }}
            className="border-2 border-black rounded-lg p-2 w-32 mt-4"
          >
            Register
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center border-2 rounded-lg w-[500px] p-4">
        <div>{headerText}</div>

        <div>
          <form action="" className="flex flex-col items-center">
            <input
              ref={usernameRegister}
              type="text"
              id="usernameRegister"
              placeholder="Enter username"
              className="border-2 border-black rounded p-2 my-3"
            />

            <input
              ref={emailRegister}
              type="text"
              id="emailRegister"
              placeholder="Enter email address"
              className="border-2 border-black rounded p-2 my-3"
            />

            <input
              ref={pass1Register}
              type="password"
              id="pass1Register"
              placeholder="Enter password"
              className="border-2 border-black rounded p-2 my-3"
            />

            <input
              ref={pass2Register}
              type="password"
              id="pass2Register"
              placeholder="Verify password"
              className="border-2 border-black rounded p-2 my-3"
            />

            <button
              ref={registerBtn}
              className="border-2 border-black rounded-lg p-2 w-32 mt-4"
            >
              Register
            </button>
          </form>
        </div>

        <div className="flex flex-col p-3 mt-4 items-center">
          <span>Already have an account?</span>
          <button
            onClick={() => {
              setHeaderText('Login');
              setAuthMode('login');
            }}
            className="border-2 border-black rounded-lg p-2 w-32 mt-4"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
