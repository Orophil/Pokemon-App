

const NotFoundPage = () => {
  return (
    <div className="bg-gray-100 h-screen justify-center">
      <center className="mt-24 m-auto">
        <svg 
          className="emoji-404" 
          enableBackground="new 0 0 226 249.135" 
          height="249.135" 
          id="Layer_1" 
          overflow="visible" 
          version="1.1" 
          viewBox="0 0 226 249.135" 
          width="226" 
          xmlSpace="preserve"
        >
        </svg>
        <div className="tracking-widest mt-4">
          <span className="text-gray-500 text-xl">Sorry, We couldn't find the Pokemon!</span>
        </div>
      </center>
    </div>
  );
}

export default NotFoundPage;
