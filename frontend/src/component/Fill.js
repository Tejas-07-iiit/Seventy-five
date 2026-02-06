const Fill = (props) => {
  return (
    <div className="percent"
      style={{background: `linear-gradient(to right, #3BA9E6 ${props.content}%, #0B1220 ${props.content}%)`,}}>
      <pre>{props.content}%</pre>
    </div>
  );
};

export default Fill;
