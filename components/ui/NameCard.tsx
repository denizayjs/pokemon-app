type NameCardProps = {
  name: string;
};

const NameCard = (props: NameCardProps) => {
  const { name } = props;
  return (
    <div className='w-[300px] h-[150px] cursor-pointer flex items-center justify-center bg-gradient-to-r from-black to-gray-700 text-white text-2xl font-medium rounded-lg'>
      {name.toUpperCase()}
    </div>
  );
};

export default NameCard;
