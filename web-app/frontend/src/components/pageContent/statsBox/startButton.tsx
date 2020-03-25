import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCollecting } from "../../../redux/actions/microActions";
import { updateGraphId } from "../../../redux/actions/graphActions";

interface StartButtonProps {
  disabled: boolean;
}

const StartButton: React.FC<StartButtonProps> = (props: StartButtonProps) => {
  const dispatch = useDispatch();

  const startCollection = async () => {
    const response = await fetch(
      "http://localhost:4000/collection/POST/start",
      {
        method: "POST"
      }
    );
    debugger;
    if (response.status === 200) {
      dispatch(updateCollecting({ type: "UPDATE_COLLECTING", value: true }));
      toast.success("Collecting Data");
    } else {
      toast.warn("Unable to Collect Data");
      Error("Error Collecting Data");
    }
  };

  return (
    <button
      className="start-button"
      onClick={startCollection}
      disabled={props.disabled}
    >
      Start Data Collection
    </button>
  );
};

export default StartButton;
