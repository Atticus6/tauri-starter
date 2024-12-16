import { Card1 } from "./_components/card1";
import { Card2 } from "./_components/card2";
import { Card3 } from "./_components/card3";

function About() {
  return (
    <div className="grid grid-cols-3 gap-4 p-10">
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

export default About;
