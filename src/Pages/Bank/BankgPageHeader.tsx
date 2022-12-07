interface Prop {
  headerText: string;
}

const BankPageHeader: React.FC<Prop> = ({ headerText }) => {
  return (
    <div className="bg-white phone:w-32 phone:text-xs laptop:w-72 p-4 rounded-lg phone:mb-1 laptop:mb-4 text-center">
      <span>{headerText}</span>
    </div>
  );
};

export default BankPageHeader;
