type NameCardProps = {
  name: string;
  handleSelect: (item: string) => void;
};

const NameCard = (props: NameCardProps) => {
  const { name, handleSelect } = props;
  return (
    <div
      onClick={() => {
        handleSelect(name);
      }}
      className='w-[300px] h-[150px] cursor-pointer flex items-center justify-center border hover:underline hover:decoration-solid text-white text-2xl font-medium rounded-lg'
    >
      {name.toUpperCase()}
    </div>
  );
};

export default NameCard;
