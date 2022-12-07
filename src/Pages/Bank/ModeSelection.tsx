import { useContext } from 'react';
import { SystemContext } from '../../contexts/SystemContext';

interface Prop {}

const ModeSelection: React.FC<Prop> = ({}) => {
  const System = useContext(SystemContext);

  const changeInterface = (selectedMode: string) => {
    System?.setTransactionMode(selectedMode);

    const modeButtons = document.querySelectorAll('.modeButton');
    modeButtons.forEach((button) => {
      if (button.id == selectedMode)
        button.setAttribute(
          'class',
          'modeButton phone:text-md laptop:text-3xl text-u_orange'
        );
      else
        button.setAttribute(
          'class',
          'modeButton phone:text-sm laptop:text-2xl text-u_darkblue'
        );
    });
  };

  return (
    <div className="flex flex-col phone:w-36 phone:h-40 laptop:w-56 laptop:h-64 phone:ml-0 laptop:ml-10 justify-evenly">
      <div
        id="withdraw"
        className="modeButton phone:text-sm laptop:text-3xl text-u_orange"
      >
        <button onClick={() => changeInterface('withdraw')}>
          Cash Withdrawal
        </button>
      </div>

      <div
        id="balance"
        className="modeButton phone:text-sm laptop:text-2xl text-u_darkblue"
      >
        <button onClick={() => changeInterface('balance')}>
          Balance Inquiry
        </button>
      </div>

      <div
        id="transfer"
        className="modeButton phone:text-sm laptop:text-2xl text-u_darkblue"
      >
        <button onClick={() => changeInterface('transfer')}>
          Funds Transfer
        </button>
      </div>

      <div
        id="pin"
        className="modeButton phone:text-sm laptop:text-2xl text-u_darkblue"
      >
        <button onClick={() => changeInterface('pin')}>Change Pin</button>
      </div>
    </div>
  );
};

export default ModeSelection;
