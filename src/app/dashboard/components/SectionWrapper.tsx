type WrapperProps = {
  children: React.ReactNode;
  title: string;
};

const Wrapper = ({ children, title }: WrapperProps) => {

    return <div className='relative bg-white rounded-xl shadow py-6 px-3 sm:px-6'>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      </div>
        {children}
    </div>
}

export default Wrapper