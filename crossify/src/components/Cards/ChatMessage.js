import Moment from "moment";
const ChatMessage = (props) => {
  return (
    <div className=" w-full  py-4 ">
      <div className="flex hover:bg-gray-200">
        <div className="ml-2 w-12 h-12 rounded-full flex-shrink-0">
          <img
            src={props.profilePic}
            className="w-12 h-12 rounded-full flex-shrink-0"
          ></img>
        </div>
        <div className="flex flex-col">
          <div className="flex ml-4">
            <div className="font-bold text-base mr-2">{props.username}</div>
            <div className="font-semibold text-gray-600 text-xs pt-1">
              {Moment(props.time).format("LLL")}
            </div>
          </div>
          <div className="mx-4 text-sm">{props.message}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
