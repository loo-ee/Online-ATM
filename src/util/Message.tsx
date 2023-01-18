import { AccountModel } from './systemConfig';

interface Prop {
  title: string;
  account: AccountModel;
  messageField: React.RefObject<HTMLInputElement>;
  mainOperation: () => void;
  preparatoryOperation: (status: boolean) => void;
}

export const Message: React.FC<Prop> = ({
  title,
  account,
  messageField,
  mainOperation,
  preparatoryOperation,
}) => {
  const bgColor = {
    BDO: 'bg-blue-900',
    BPI: 'bg-red-900',
    LANDBANK: 'bg-green-600',
  };

  return (
    <div
      className={
        'absolute text-white phone:w-[150px] tablet:w-[210px] laptop:w-[300px] p-5 rounded-md self-center flex flex-col items-center ' +
        bgColor[account.bank as keyof typeof bgColor]
      }
    >
      <span className="phone:mb-3 laptop:mb-7 phone:text-md tablet:text-xl laptop:text-3xl text-center">
        {title}
      </span>
      <input
        ref={messageField}
        type="text"
        placeholder="Enter message"
        className="phone:p-2 tablet:p-3 rounded phone:w-[110px] tablet:w-[180px] laptop:w-[240px] phone:text-xs tablet:text-md laptop:text-xl text-black"
      />

      <div className="flex flex-row laptop:justify-evenly phone:justify-between w-full">
        <button
          className="bg-green-500 phone:p-1 laptop:p-3 rounded mt-5 phone:w-14 tablet:w-28 laptop:w-36 text-white phone:text-sm laptop:text-xl"
          onClick={mainOperation}
        >
          Send
        </button>

        <button
          className="bg-red-500 phone:p-2 laptop:p-3 rounded phone:w-10 tablet:w-12 laptop:w-20 mt-5 text-white text-xl phone:text-sm laptop:text-xl"
          onClick={() => preparatoryOperation(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};
