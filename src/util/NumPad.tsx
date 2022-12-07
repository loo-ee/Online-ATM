import { useState } from 'react';

interface Prop {
  mainOperation:
    | React.Dispatch<React.SetStateAction<number>>
    | ((password: number) => void);
}

const NumPad: React.FC<Prop> = ({ mainOperation }) => {
  const buttons: JSX.Element[] = [];
  const [strAmount, setStrAmount] = useState('0');

  const appendNumber = (num: string): void => {
    if (strAmount == '0') setStrAmount(num);
    else setStrAmount(strAmount + num);
  };

  const deleteNumber = () => {
    const tempNum = strAmount.slice(0, -1);

    if (tempNum == '') setStrAmount('0');
    else setStrAmount(tempNum);
  };

  const clearAmount = () => {
    setStrAmount('0');
  };

  const processInput = () => {
    mainOperation(Number(strAmount));
    clearAmount();
  };

  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <button
        key={i.toString()}
        className="border-2 border-u_darkblue phone:w-9 phone:h-9 laptop:w-16 laptop:h-10 bg-white m-1"
        onClick={() => appendNumber(i.toString())}
      >
        {i.toString()}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="border-2 rounded border-u_darkblue my-4 phone:w-[120px] phone:h-12 laptop:w-[233px] laptop:h-12 p-3">
        <span className="">{strAmount}</span>
      </div>

      <div className="grid grid-cols-3 phone:w-32  laptop:w-64 justify-items-center">
        {buttons}

        <button
          className="border-2 border-u_darkblue bg-white m-1 phone:w-9 phone:h-9 laptop:w-16 laptop:h-10"
          onClick={() => appendNumber('.')}
        >
          .
        </button>

        <button
          className="border-2 border-u_darkblue bg-white m-1 phone:w-9 phone:h-9 laptop:w-16 laptop:h-10"
          onClick={() => appendNumber('0')}
        >
          0
        </button>

        <button
          className="border-2 border-u_darkblue bg-white m-1 phone:w-9 phone:h-9 laptop:w-16 laptop:h-10"
          onClick={() => appendNumber('00')}
        >
          00
        </button>

        <button
          className="border-2 phone:text-sm border-u_darkblue bg-white m-1 phone:w-9 phone:h-9 laptop:w-16 laptop:h-10"
          onClick={deleteNumber}
        >
          DEL
        </button>

        <button
          className="border-2 phone:text-sm border-u_darkblue bg-white m-1 phone:w-9 phone:h-9 laptop:w-16 laptop:h-10"
          onClick={clearAmount}
        >
          CLR
        </button>

        <button
          className="border-2 phone:text-sm border-u_darkblue bg-white m-1 phone:w-9 phone:h-9 laptop:w-16 laptop:h-10"
          onClick={processInput}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NumPad;
