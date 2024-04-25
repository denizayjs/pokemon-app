import Logo from '@/assets/Logo';

const Navbar = () => {
  return (
    <div className='flex sticky items-center  px-6 py-2 space-x-4 h-20 rounded-xl backdrop-blur-md bg-white/10 mx-[120px] mt-8'>
      <Logo />
      <span className='font-bold text-2xl text-white'>Pokemon APP</span>
    </div>
  );
};

export default Navbar;
