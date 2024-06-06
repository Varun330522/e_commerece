export function Verification(){
    return (
        <div className=" flex items-center justify-center  overflow-hidden">
        <div className="mt-3 w-[500px] h-[400px] border-[#c1c1c1] rounded-lg border-[1px]	 ">
      <h2 className="mt-6 text-2xl font-semibold text-center">Verify your email</h2>
      <p className="text-center mt-6 font-normal">Enter the 8 digit code you have received on </p>
      
      <form className="px-10 py-3">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 rounded-lg border-[1px]  border-[#c1c1c1]   focus:outline-none"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full px-4 py-2 font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            type="button"
          > VERIFY
          </button>
        </div>
      </form>
    </div>
    </div>
    )
}