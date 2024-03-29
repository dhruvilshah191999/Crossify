import React from "react";
import ProfileDetails from "components/Cards/ProfileDetails";
export default function Profile() {
  const onreturn = () => {
    window.location.href = "/profile/edit/myprofile";
  };
  return (
    <>
      <main className="profile-page">
        <section className="relative py-16 ">
          <div className="container mx-auto px-4 mt-36">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 pb-6">
              <div className=" pb-6">
                <button
                  className="absolute right-0 mt-6 mr-8 hover:bg-blue-300 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => onreturn()}
                >
                  Edit &nbsp; <i className="fas fa-edit"></i>
                </button>
                <ProfileDetails />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
