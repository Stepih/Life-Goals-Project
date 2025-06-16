type SubmitButtonProps = {
    loading: boolean;
    children: React.ReactNode;
  };
  
  export default function SubmitButton({ loading, children }: SubmitButtonProps) {
    return (
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold cursor-pointer py-2 px-5 rounded hover:bg-blue-700 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
  