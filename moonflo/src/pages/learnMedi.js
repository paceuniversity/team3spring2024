import React from 'react';
import { useState } from 'react';
import Accordion from '../components/Accordion.js';
import Accordions from '../components/Accordion.css';
import './medinfo.css';


const accordionData = [
  { 
    title: 'Zen Meditation', 
    content: (
      <>
        <strong>What is Zen Meditation?</strong>
        <p>Zen mediatation is a Buddhist tardition that dates back to the Tang Dynasty. The word "zen" comes from the Chinese word Ch'an, which translate to concentartion or meditation. </p>
        <p>Zen meditation involves sitting upright and following the breath, in and out of your belly, letting your mind be.</p>
      </>
    )
  },
  { 
    title: 'Yoga Meditation', 
    content: (
      <>
        <strong>What is Yoga Meditation?</strong>
        <p>Much like the different array of mindfulness routines, yoga practice encompasses diverse styles, such as Kundalini yoga practice, that prioritizes bolstering the anxious treat to improve our endurance to daily stressors.</p>
        <p>To fully fill the neuromuscular transformations induced by yoga practice and collect optimal advantages from the session, it's essential to assign time for savasana or Shavasana — additionally referred to as corpse pose or relaxation pose letting the body to recline and plunge tension</p>
        <p>It is often done in a class or with a teacher, guiding you through the meditation. Some individuals even use online video guides.</p>
      </>
    )
  },
  { 
    title: 'Chakra Meditation', 
    content: (
      <>
        <strong>What is Chakra Meditation?</strong>
        <p>Origing from the Sanskrit, "Chakra" means the wheel or cycle.</p>
        <p>This mindfulness technique is aimed at maintaining the body’s basic seven chakras. These seven chakras are the Root chakra, the Sacral Chakra, the Solar Plexus chakra, the Heart chakra, the Throat chakra, the Third Eye chakra, and the Crown chakra.</p>
        <p>Blocked or imbalanced chakras can consequence in discomfiting physical and mental symptoms, but chakra mindfulness can assist to carry all of them back into equilibrium </p>
      </>
    )
  },
  { 
    title: 'Sound Bath Meditation', 
    content: (
      <>
        <strong>What is Sound Bath Meditation?</strong>
        <p>This practice employs an array of instruments such as bowls, gongs, and other resonant tools to generate harmonic sound waves. These vibrations serve to anchor the attention and guide the mind towards a state of deep relaxation and heightened focus. </p>
        <p>The rich tapestry of sounds produced in this form of meditation aids in quieting mental chatter and cultivating inner stillness, facilitating a profound sense of tranquility and clarity</p>
      </>
    )
  },
];

const LearnMedi = () => {

  const [openSection, setOpenSection] = useState(null);

  const openAccordion = index => {
    if (openSection === index) {
      setOpenSection(null);
    } else {
      setOpenSection(index);
    }
  };

  return (
<div id='medinfo'>

  <h1>Learn how to Meditation!</h1>
  <p>Meditation is a practice that nurtures your inner well-being and cultivates mindfulness. It involves dedicating time to quieting the mind, fostering a deeper connection with the present moment. Through meditation, you embark on a journey of self-discovery and inner peace. The practice varies widely, encompassing techniques such as Zen meditation, Yoga meditation, Chakra meditation, and Sound Bath meditation, each offering unique paths to mental clarity and emotional balance.</p>
  <strong>What You Might Feel And Why</strong>
        <p>Many people often feel a range of sensations, which can very from person to person and session to session. Here are some common experience reported by individuals:</p>
        <ul>
            <li>Inner Peace: As you let go of distraction and focus on the present, meditation can lead to a sense of inner peace.</li>
            <li>Clarity of Mind: Meditation can lead to a heightend menal clarity, allowing individuals to see things more clearly and make better decisions </li>
            <li>Emotional Stability: Regularly practicing meditation can assist in managing emotions, leading to a better sense of emotional stability. </li>
            <li>Physical Relaxation: During meditation you may experinces a deep feeling of physical relaxation, releasing stress from your body. </li>
        </ul>
        <strong>What You Might See And Why</strong>
        <p>Many people often see a range of phenomena, which can very from person to person and session to session. Here are some common visual phenomena reported by individuals:</p>
        <ul>
            <li>Colors and Lights: Some people report seeing vivid colors or flashes of light, especially during deep states of meditation. These visual experiences can be subtle or intense and may arise spontaneously.</li>
            <li>Images and Symbols: Practitioners might encounter mental imagery, symbols, or scenes during meditation. These images can be abstract or representational and may carry personal significance or arise from the unconscious mind. </li>
            <li>Inner Stillness: While not a visual experience in the conventional sense, a common "seeing" in meditation is the perception of inner stillness or clarity. This is often described as a quieting of mental chatter and a deepening awareness of the present moment. </li>
            <li>Inner Landscapes: In deeper states of meditation, some people report entering into inner landscapes or realms of the imagination. These inner journeys can be highly subjective and may involve fantastical or symbolic elements.</li>
        </ul>
  <p>Understanding the different types of meditation can deepen your practice. Click on each type below to explore and enhance your meditation journey!</p>
  {accordionData.map((section, index) => (
    <Accordion key={index} title={section.title} content={section.content} isOpen={openSection === index} onClick={() => openAccordion(index)} />
  ))}

 </div>
  );
};

export default LearnMedi;
