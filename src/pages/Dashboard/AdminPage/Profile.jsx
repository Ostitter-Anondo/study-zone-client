import { BiUserCircle } from "react-icons/bi";
import useMainContext from "../../../utils/useMainContext";
import { RiImageCircleAiLine } from "react-icons/ri";
import useAxios from "../../../utils/useAxios";

const Profile = () => {
  const { userData, setUserData, toastSuc } = useMainContext();
  const axiosHook = useAxios();

  const updateName = (e) => {
    e.preventDefault();
    axiosHook
      .put(`/updatedata/${userData.uid}`, { name: e.target.name.value })
      .then((res) => {
        setUserData(res.data.user);
        toastSuc(`name changed successfully`);
      })
      .catch((err) => console.error(err));
  };
  const updatePhoto = (e) => {
    e.preventDefault();
    axiosHook
      .put(`/updatedata/${userData.uid}`, { photo: e.target.photo.value })
      .then((res) => {
        setUserData(res.data.user);
        toastSuc(`name changed successfully`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-3">
        <img
          src={
            userData?.photo
              ? userData.photo
              : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          }
          className="size-32 rounded-full"
          alt="userPic"
        />
        <h3 className="font-extrabold text-3xl text-accent">
          {userData?.name ? userData.name : `User`}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-lg table-zebra border border-base-300 rounded-lg">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{userData.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <form onSubmit={updateName}>
          <label className="w-full input input-bordered flex items-center gap-2">
            <BiUserCircle />
            <input
              type="text"
              className="grow"
              placeholder="Change Username"
              name="name"
              required
            />
            <button type="submit" className="btn btn-xs btn-outline">
              Change
            </button>
          </label>
        </form>
        <form onSubmit={updatePhoto}>
          <label className="w-full input input-bordered flex items-center gap-2">
            <RiImageCircleAiLine />
            <input
              type="text"
              className="grow"
              placeholder="Change Photo (URL)"
              name="photo"
              required
            />
            <button type="submit" className="btn btn-xs btn-outline">
              Change
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Profile;
