import { AccountRequest } from '../../util/systemConfig';

interface RequestCardProp {
  requestBody: AccountRequest;
}

const RequestCard: React.FC<RequestCardProp> = ({ requestBody }) => {
  const bgColor = {
    BDO: 'bg-blue-900',
    BPI: 'bg-red-900',
  };

  return (
    <div
      className={
        'my-3 p-4 text-white rounded-lg phone:w-[150px] tablet:w-[300px] ' +
        bgColor[requestBody.bank as keyof typeof bgColor]
      }
    >
      <div>
        <span className="text-2xl">Account Creation</span>
      </div>

      <div className="flex flex-col mt-2">
        <span>Bank: {requestBody.bank}</span>
        <span>Name: {requestBody.username}</span>
      </div>
    </div>
  );
};

export default RequestCard;
