export const initialState = {
  openVideo: false,
  frame: 0,
  playPauseReset: "Play",
  openRate: false,
  formData: { city: 'Toronto'},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "open-video": {
      return { ...state, openVideo: true };
    }

    case "close-video": {
      return { ...state, openVideo: false, frame: 0, playPauseReset: "Play" };
    }

    case "frame-increment": {
      return { ...state, frame: state.frame + 1 };
    }

    case "play-pause-reset-video": {
      if (state.playPauseReset === "Play") {
        return { ...state, playPauseReset: "Pause" };
      } else if (state.playPauseReset === "Pause") {
        return { ...state, playPauseReset: "Play" };
      } else if (state.playPauseReset === "Reset") {
        return { ...state, frame: 0, playPauseReset: "Pause" };
      }
    }

    case "end-of-video": {
      return { ...state, playPauseReset: "Reset" };
    }

    case "rate-this-trip": {
      return {
        ...state,
        openVideo: false,
        openRate: true,
        frame: 0,
        playPauseReset: "Play",
      };
    }
    case "close-rate": {
      return { ...state, openRate: false, frame: 0, playPauseReset: "Play" };
    }

    case "form-change": {
      console.log(state.formData);
      return { ...state, formData: { ...state.formData, ...action.input } };
    }
  }
};
