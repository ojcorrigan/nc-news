import dog from "../Images/404-dog.jpeg";

const RouteMissing = () => {
  return (
    <section className="missingPage">
      <img id="missingDog" alt="404 page not found" src={dog} />
      <p id="missingText">Uh oh. Route not found.</p>
    </section>
  );
};

export default RouteMissing;
