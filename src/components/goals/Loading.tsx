type LoadingProps = { className?: string; style?: object; text?: string };

const Loading: React.FC<LoadingProps> = ({ className, style, text }) => {
  return (
    <div className={`d-flex align-items-center ${className && className}`}>
      <strong>{text ? text : "Loading..."}</strong>
      <div
        style={style && style}
        className="spinner-border ms-auto"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export { Loading };
