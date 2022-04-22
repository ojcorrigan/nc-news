import cabinet from "../Images/loading.jpg";
const Loading = () => {
  return (
    <section className="loading">
      <img id="cabinet" src={cabinet}></img>
      <p>We're just finding the articles</p>
    </section>
  );
};

export default Loading;
