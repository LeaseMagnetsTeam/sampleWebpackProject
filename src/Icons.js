import React, { useState } from 'react';
import './Icons.css';

export const CloseIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
    height="15px"
    width="15px"
    style={{ position: 'absolute', top: '25%', left: '30%' }}
  >
    <path d="M2.37129 0.6C1.91903 0.6 1.46097 0.775311 1.1165 1.1197C0.427892 1.80814 0.427741 2.94047 1.1166 3.62865L10.4903 13L1.1165 22.3715C0.427892 23.0599 0.427741 24.1922 1.1166 24.8804C1.45062 25.2143 1.91301 25.4 2.37129 25.4C2.82952 25.4 3.29159 25.2147 3.62608 24.8803L13 15.5091L22.3739 24.8803C22.708 25.2142 23.1704 25.4 23.6287 25.4C24.0763 25.4 24.5292 25.2346 24.8835 24.8803C25.5721 24.1919 25.5723 23.0597 24.8835 22.3715C24.8835 22.3714 24.8834 22.3714 24.8834 22.3714L15.5101 13L24.8835 3.62853C25.5721 2.9401 25.5723 1.80777 24.8834 1.11959C24.195 0.43192 23.0628 0.431035 22.3743 1.1197C22.3743 1.11974 22.3743 1.11977 22.3742 1.11981L13.0004 10.4913L3.62647 1.1197C3.28241 0.775727 2.82397 0.6 2.37129 0.6Z" />
  </svg>
);

export const SettingsIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 28"
    width="16.07px"
    height="15px"
    style={{ position: 'absolute', top: '25%', left: '30%' }}
  >
    <path d="M29.629 11.8721L26.2757 10.9388C26.0438 10.184 25.725 9.45485 25.3247 8.7641L26.9664 5.89878C27.0279 5.79062 27.0505 5.66683 27.0307 5.54578C27.0108 5.42472 26.9497 5.31286 26.8562 5.22678L24.4639 2.98679C24.3716 2.89969 24.2516 2.84265 24.1218 2.82416C23.992 2.80566 23.8592 2.82669 23.7432 2.88413L20.6902 4.40545C19.9421 4.01407 19.1498 3.70106 18.3279 3.47213L17.3269 0.382808C17.2846 0.268957 17.2046 0.170568 17.0985 0.101803C16.9923 0.0330378 16.8656 -0.00255661 16.7364 0.000142957H13.353C13.2231 0.000707223 13.0967 0.039935 12.9922 0.112117C12.8878 0.1843 12.8108 0.28567 12.7725 0.401474L11.7715 3.48146C10.9427 3.70917 10.1437 4.02221 9.38917 4.41479L6.38624 2.90279C6.27025 2.84536 6.13748 2.82433 6.00765 2.84282C5.87782 2.86132 5.75785 2.91835 5.66554 3.00546L3.23316 5.21745C3.13974 5.30352 3.07857 5.41539 3.05873 5.53644C3.0389 5.6575 3.06145 5.78129 3.12305 5.88945L4.74464 8.68943C4.32428 9.38998 3.98857 10.1318 3.74366 10.9014L0.430421 11.8348C0.306222 11.8705 0.197505 11.9423 0.120091 12.0397C0.0426762 12.137 0.000605165 12.2549 0 12.3761V15.5307C0.000605165 15.6519 0.0426762 15.7698 0.120091 15.8671C0.197505 15.9645 0.306222 16.0363 0.430421 16.0721L3.76368 17.0054C4.01127 17.7621 4.34692 18.4914 4.76466 19.18L3.12305 22.1107C3.06145 22.2189 3.0389 22.3426 3.05873 22.4637C3.07857 22.5848 3.13974 22.6966 3.23316 22.7827L5.6255 25.0133C5.71781 25.1005 5.83778 25.1575 5.96761 25.176C6.09744 25.1945 6.23021 25.1734 6.3462 25.116L9.43922 23.576C10.1709 23.9442 10.9427 24.2383 11.7415 24.4534L12.7425 27.5987C12.7808 27.7145 12.8578 27.8158 12.9622 27.888C13.0666 27.9602 13.193 27.9994 13.323 28H16.7063C16.8363 27.9994 16.9627 27.9602 17.0671 27.888C17.1715 27.8158 17.2485 27.7145 17.2869 27.5987L18.2879 24.444C19.0798 24.2278 19.8449 23.9337 20.5701 23.5667L23.6831 25.116C23.7991 25.1734 23.9319 25.1945 24.0617 25.176C24.1916 25.1575 24.3115 25.1005 24.4038 25.0133L26.7962 22.7827C26.8896 22.6966 26.9508 22.5848 26.9706 22.4637C26.9904 22.3426 26.9679 22.2189 26.9063 22.1107L25.2447 19.2174C25.6424 18.5386 25.9612 17.8221 26.1956 17.0801L29.5689 16.1467C29.6931 16.111 29.8018 16.0392 29.8792 15.9418C29.9566 15.8445 29.9987 15.7266 29.9993 15.6054V12.4227C30.0052 12.3067 29.9729 12.1917 29.9067 12.0933C29.8405 11.9949 29.7436 11.9177 29.629 11.8721ZM15.0447 19.1334C13.9558 19.1334 12.8914 18.8323 11.9861 18.2683C11.0807 17.7042 10.3751 16.9025 9.95839 15.9645C9.5417 15.0265 9.43268 13.9944 9.64511 12.9986C9.85753 12.0028 10.3819 11.0882 11.1518 10.3703C11.9218 9.65237 12.9027 9.16347 13.9707 8.9654C15.0386 8.76733 16.1455 8.86899 17.1515 9.25751C18.1575 9.64604 19.0173 10.304 19.6223 11.1482C20.2272 11.9923 20.5501 12.9848 20.5501 14.0001C20.5501 15.3615 19.9701 16.6672 18.9376 17.6299C17.9051 18.5926 16.5048 19.1334 15.0447 19.1334Z" />
  </svg>
);

export const ShareIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    width="15px"
    height="15px"
    style={{ position: 'absolute', top: '25%', left: '30%' }}
  >
    <path d="M22.065 11.0155C23.2025 11.0155 24.3121 10.6632 25.2414 10.0072C26.1707 9.35117 26.874 8.4235 27.2548 7.35162C27.6357 6.27974 27.6753 5.11624 27.3682 4.02096C27.0611 2.92567 26.4225 1.95233 25.5399 1.23463C24.6574 0.516934 23.5743 0.0900961 22.4394 0.0127503C21.3045 -0.0645955 20.1736 0.211345 19.2018 0.802667C18.2301 1.39399 17.4653 2.27168 17.0124 3.31518C16.5596 4.35868 16.441 5.51679 16.6728 6.63042L9.42824 10.4244C8.66023 9.64607 7.67791 9.11394 6.60642 8.89582C5.53493 8.67769 4.42277 8.78344 3.41159 9.1996C2.40041 9.61575 1.53598 10.3235 0.928426 11.2326C0.320868 12.1418 -0.00232586 13.2112 1.26006e-05 14.3046C0.00235106 15.3981 0.330116 16.4661 0.941557 17.3727C1.553 18.2792 2.42044 18.9832 3.43339 19.395C4.44634 19.8069 5.55895 19.9079 6.6295 19.6852C7.70004 19.4624 8.68007 18.9261 9.44475 18.1445L16.6233 21.6578C16.4135 23.0137 16.718 24.3991 17.477 25.542C18.236 26.685 19.3947 27.5031 20.7258 27.8358C22.0569 28.1685 23.4643 27.9918 24.6718 27.3403C25.8793 26.6889 26.7998 25.6097 27.2526 24.3145C27.7055 23.0194 27.658 21.6018 27.1195 20.3398C26.581 19.0779 25.5904 18.0627 24.342 17.4935C23.0936 16.9243 21.6776 16.8421 20.3718 17.2631C19.0659 17.6841 17.9645 18.5779 17.2837 19.7691L10.5641 16.4836C10.8705 15.7886 11.0287 15.0374 11.0287 14.2779C11.0287 13.5183 10.8705 12.7671 10.5641 12.0721L17.4224 8.47294C17.92 9.25296 18.6063 9.89488 19.4178 10.3393C20.2293 10.7837 21.1398 11.0163 22.065 11.0155Z" />
  </svg>
);

export const VolumeMuteIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="15px"
    height="15px"
    style={{ position: 'relative', left: '5%' }}
  >
    <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
  </svg>
);

export const VolumeFullIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="15px"
    height="15px"
    style={{ position: 'relative', left: '5%' }}
  >
    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
  </svg>
);

export const BackIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 28"
    width="9.64px"
    height="15px"
    style={{ position: 'absolute', top: '25%', left: '35%' }}
  >
    <path d="M16.71 0.625698C15.8067 -0.208566 14.3954 -0.208566 13.4922 0.625698L0.677431 12.514C-0.22581 13.3482 -0.22581 14.6518 0.677431 15.486L13.5486 27.3743C14.0002 27.7914 14.5648 28 15.1293 28C15.6938 28 16.2583 27.7914 16.71 27.3743C17.6132 26.54 17.6132 25.2365 16.71 24.4022L5.4759 13.9739L16.71 3.59777C17.6132 2.7635 17.6132 1.45996 16.71 0.625698Z" />
  </svg>
);

export const PauseIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
      }}
    >
      {!isHovered ? (
        <div
          className="c-play-btn"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '120px',
            height: '120px',
            borderRadius: '100%',
            border: '4px solid white',
          }}
        >
          <svg
            height="96"
            width="96"
            style={{ position: 'relative', top: '8%', left: '0%' }}
          >
            <path
              clipRule="evenodd"
              d="M37.326 33.822c0-2.408 2.695-3.835 4.687-2.481l20.862 14.178c1.752 1.19 1.752 3.772 0 4.963L42.013 64.66c-1.992 1.354-4.687-.072-4.687-2.48V33.821z"
              fill="#fff"
            />
          </svg>
        </div>
      ) : (
        <div
          className="c-play-btn"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '120px',
            height: '120px',
            borderRadius: '100%',
            border: '4px solid hsla(0, 0%, 100%, 0.5)',
          }}
        >
          <svg
            height="96"
            styleName=""
            width="96"
            style={{
              position: 'relative',
              top: '8%',
              left: '0%',
              animation: 'no-spin 2.4s infinite',
            }}
          >
            <path
              clipRule="evenodd"
              d="M37.326 33.822c0-2.408 2.695-3.835 4.687-2.481l20.862 14.178c1.752 1.19 1.752 3.772 0 4.963L42.013 64.66c-1.992 1.354-4.687-.072-4.687-2.48V33.821z"
              fill="#fff"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export const FullscreenIcon = ({ fillColor = '#fff' }) => (
  <svg
    fill={fillColor}
    height="15px"
    width="15px"
    viewBox="0 0 28 28"
    style={{ position: 'absolute', top: '25%', left: '30%' }}
  >
    <path
      d="M28 0V9.33333H24.8889V5.30444L19.7711 10.4378L17.5622 8.22889L22.6956 3.11111H18.6667V0H28ZM0 0V9.33333H3.11111V5.30444L8.22889 10.4378L10.4378 8.22889L5.30444 3.11111H9.33333V0H0ZM28 28V18.6667H24.8889V22.6956L19.7711 17.5778L17.5778 19.7711L22.6956 24.8889H18.6667V28H28ZM9.33333 28V24.8889H5.30444L10.4222 19.7711L8.22889 17.5622L3.11111 22.6956V18.6667H0V28H9.33333Z"
      fill={fillColor}
    />
  </svg>
);

export const ArrowIcon = (props) => (
  <svg
    {...props}
    width="15"
    height="18"
    viewBox="0 0 25 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.539786 0.584414C-0.179929 1.36364 -0.179929 2.58117 0.539786 3.36039L10.7957 14.4156C11.5154 15.1948 12.64 15.1948 13.3597 14.4156L23.6156 3.31169C23.9755 2.92208 24.1554 2.43506 24.1554 1.94805C24.1554 1.46103 23.9755 0.974024 23.6156 0.584413C22.8959 -0.194807 21.7714 -0.194807 21.0517 0.584414L12.0552 10.276L3.10377 0.584414C2.38406 -0.194806 1.2595 -0.194806 0.539786 0.584414Z" />
    <path
      d="M0.539786 15.5844C-0.179929 16.3636 -0.179929 17.5812 0.539786 18.3604L10.7957 29.4156C11.5154 30.1948 12.64 30.1948 13.3597 29.4156L23.6156 18.3117C23.9755 17.9221 24.1554 17.4351 24.1554 16.948C24.1554 16.461 23.9755 15.974 23.6156 15.5844C22.8959 14.8052 21.7714 14.8052 21.0517 15.5844L12.0552 25.276L3.10377 15.5844C2.38406 14.8052 1.2595 14.8052 0.539786 15.5844Z"
      fillOpacity="0.5"
    />
  </svg>
);

export const CopyClipboardIcon = ({ fillColor = '#fff', ...props }) => (
  <svg
    fill={fillColor}
    height="20px"
    width="20px"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
  </svg>
);

export const CopyClipboardSuccessIcon = ({ fillColor = '#fff', ...props }) => (
  <svg
    fill={fillColor}
    height="20px"
    width="20px"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
    />
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
  </svg>
);

export const EmailIcon = ({ fillColor = 'fff', ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="16px"
    width="16px"
    fill={fillColor}
  >
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
  </svg>
);

export const PhoneIcon = ({ fillColor = 'fff', ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="16px"
    width="16px"
    fill={fillColor}
  >
    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
  </svg>
);

export const LinkedinIcon = ({ fillColor = 'fff', ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="16px"
    width="16px"
    fill={fillColor}
  >
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
  </svg>
);

export const VideoPlayFillIcon = ({ fillColor = '#fff', ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22">
    <path
      fill={fillColor}
      d="M9.984 16.5l6-4.5-6-4.5v9zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"
    />
  </svg>
);

export const ThumbIcon = ({ fillColor = '#fff', ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    viewBox="0 0 24 24"
    fill={fillColor}
  >
    <g>
      <rect fill="none" height="50" width="50" x="0" />
    </g>
    <g>
      <g>
        <g>
          <path d="M9,11.24V7.5C9,6.12,10.12,5,11.5,5S14,6.12,14,7.5v3.74c1.21-0.81,2-2.18,2-3.74C16,5.01,13.99,3,11.5,3S7,5.01,7,7.5 C7,9.06,7.79,10.43,9,11.24z M18.84,15.87l-4.54-2.26c-0.17-0.07-0.35-0.11-0.54-0.11H13v-6C13,6.67,12.33,6,11.5,6 S10,6.67,10,7.5v10.74c-3.6-0.76-3.54-0.75-3.67-0.75c-0.31,0-0.59,0.13-0.79,0.33l-0.79,0.8l4.94,4.94 C9.96,23.83,10.34,24,10.75,24h6.79c0.75,0,1.33-0.55,1.44-1.28l0.75-5.27c0.01-0.07,0.02-0.14,0.02-0.2 C19.75,16.63,19.37,16.09,18.84,15.87z" />
        </g>
      </g>
    </g>
  </svg>
);

export const LocationIcon = ({ fillColor = '#fff', style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 85 85"
  >
    <path
      fill="currentColor"
      fillOpacity="0.85"
      d="M42.155 21.182A10.625 10.625 0 1052.78 31.807a10.637 10.637 0 00-10.625-10.625zm0 15.938a5.313 5.313 0 115.313-5.313 5.319 5.319 0 01-5.313 5.313z"
    >
      {' '}
    </path>
    <path
      fill="currentColor"
      fillOpacity="0.85"
      d="M62.572 11.374a28.874 28.874 0 00-44.61 36.177l20.073 30.815a4.917 4.917 0 008.24 0L66.35 47.55a28.874 28.874 0 00-3.777-36.177zm-.675 33.277L42.156 74.957 22.413 44.651c-6.043-9.276-4.747-21.691 3.082-29.52a23.56 23.56 0 0133.32 0c7.83 7.829 9.125 20.244 3.082 29.52z"
    >
      {' '}
    </path>
  </svg>
);

export const PlayIcon = ({ fillColor = '#fff', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 12 15"
  >
    <path fill="currentColor" d="M0 0v14.33l11.26-7.165L0 0z" />
  </svg>
);

export const PlayIcon2 = ({ fillColor = '#fff', ...props }) => (
  <svg
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path
      fill="currentColor"
      d="M361 215c14.3 8.8 23 24.3 23 41s-8.7 32.2-23 40.1l-287.97 176c-14.82 9.9-33.37 10.3-48.51 1.8A48.02 48.02 0 010 432V80a48.02 48.02 0 0124.52-41.87 48.019 48.019 0 0148.51.91L361 215z"
    />
  </svg>
);

export const LinkIcon = ({ fillColor = '#fff', ...props }) => (
  <svg
    height="100%"
    width="100%"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M384 32H64C28.65 32 0 60.66 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.66 419.3 32 384 32zM344 312c0 17.69-14.31 32-32 32s-32-14.31-32-32V245.3l-121.4 121.4C152.4 372.9 144.2 376 136 376s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L234.8 200H168c-17.69 0-32-14.31-32-32s14.31-32 32-32h144c17.69 0 32 14.31 32 32V312z"
    />
  </svg>
);

export const LinkIcon2 = ({ fillColor = '#fff', ...props }) => (
  <svg
    height="12px"
    width="12px"
    viewBox="0 0 14 15"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M10.5 9.5C10.0078 9.5 9.625 9.91016 9.625 10.375V13H1.75V5.15234H4.375C4.83984 5.15234 5.25 4.74219 5.25 4.27734C5.25 3.78516 4.83984 3.40234 4.375 3.40234H1.75C0.765625 3.40234 0 4.16797 0 5.15234V13C0 13.9844 0.765625 14.75 1.75 14.75H9.625C10.582 14.75 11.375 13.9844 11.375 13V10.375C11.375 9.91016 10.9648 9.5 10.5 9.5ZM13.7266 1.02344C13.5625 0.859375 13.3438 0.75 13.125 0.75H8.75C8.25781 0.75 7.875 1.16016 7.875 1.625C7.875 2.11719 8.25781 2.5 8.72266 2.5H10.9922L4.86719 8.70703C4.53906 9.0625 4.53906 9.60938 4.86719 9.9375C5.22266 10.293 5.76953 10.293 6.125 9.9375L12.25 3.75781V6C12.25 6.49219 12.6328 6.875 13.125 6.875C13.5898 6.875 14 6.49219 14 6V1.625C14 1.40625 13.8906 1.1875 13.7266 1.02344Z"
    />
  </svg>
);

export const DollarSign = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const Phone = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

export const Calendar = ({ style }) => (
  <svg
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
    />
  </svg>
);
