import Form from "./Form";

const LoginPage = () => {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-4xl font-bold text-green-500 hover:cursor-pointer">
          to<span className="text-blue-700">DO.</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
